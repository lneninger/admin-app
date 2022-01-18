import { IConfig } from './../functions.models';
import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import { Stripe } from 'stripe';
import * as Cors from 'cors';
import { ICustomerInputModel } from './payment.models';
import { logHttp } from '../site/log-wrapper-function';
import { DocumentMetadata } from 'plaid';

const cors = Cors({ origin: true });

const stripe = new Stripe(functions.config().stripe.secretkey, { apiVersion: (functions.config() as IConfig).stripe.apiversion });

export const customerCreate = functions.https.onRequest((req: functions.https.Request, res: functions.Response) => {

  return cors(req, res, async () => {

    return logHttp(req, res, 'customerCreate', async () => {

      const data = <ICustomerInputModel>req.body.data;
      console.log('Mapped to model', data, 'original body', req.body);


      let userData: DocumentMetadata | undefined;
      try {
        userData = (await admin.firestore().collection('/entities').doc(data.userId).get());
      } catch (eror) {
        userData = undefined;
      }
      if (!userData || !userData.data()?.paymentId) {

        console.log('Creating customer');
        const customer: Stripe.CustomerCreateParams = {
          email: data.email,
          name: data.fullName
        };

        const response = await stripe.customers.create(customer);
        // console.log('Customer Create Response:', response);

        // add payment id claim
        const auth = admin.auth();
        const userRecord = await auth.getUser(data.userId);
        let claims = userRecord.customClaims || {};
        claims = { ...claims, paymentId: response.id };
        await auth.setCustomUserClaims(data.userId, claims);

        // add payment id to entity metadata
        const entityUpdate = { paymentId: response.id };
        try {
          await admin.firestore().collection('/entities').doc(data.userId).update(entityUpdate);
        } catch (error) {
          await admin.firestore().collection('/entities').doc(data.userId).set(entityUpdate);
        }

        functions.logger.log('entity metadata created', entityUpdate);

        const result = { customer: response.id };
        res.status(200).json();

        return result;
      } else {
        console.log('Customer already exists');
        return res.status(204).send();
      }
    });

  });

});

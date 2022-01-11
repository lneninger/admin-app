import { IConfig } from './../functions.models';
import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import { Stripe } from 'stripe';
import * as Cors from 'cors';
import { ICustomerInputModel } from './payment.models';
import { logHttp } from '../site/log-wrapper-function';

const cors = Cors({ origin: true });

const stripe = new Stripe(functions.config().stripe.secretKey, { apiVersion: (functions.config() as IConfig).stripe.apiVersion });

export const customerCreate = functions.https.onRequest((req: functions.https.Request, res: functions.Response) => {

  return cors(req, res, async () => {

    return logHttp(req, res, 'customerCreate', async () => {

      const data = <ICustomerInputModel>req.body.data;
      console.log('Mapped to model', data, 'original body', req.body);

      const userData = (await admin.firestore().collection('/entities').doc(data.entityId).get()).data();
      if (!userData || !userData.paymentId) {

        const customer: Stripe.CustomerCreateParams = {
          email: data.email,
          name: data.fullName
        };

        const response = await stripe.customers.create(customer);
        console.log('Customer Create Response:', response);

        // add payment id claim
        const auth = admin.auth();
        const userRecord = await auth.getUser(data.entityId);
        let claims = userRecord.customClaims || {};
        claims = { ...claims, paymentId: response.id };
        await auth.setCustomUserClaims(data.entityId, claims);

        // add payment id to entity metadata
        const entityUpdate = { paymentId: response.id };
        try {
          await admin.firestore().collection('/entities').doc(data.entityId).update(entityUpdate);
        } catch (error) {
          await admin.firestore().collection('/entities').doc(data.entityId).set(entityUpdate);
        }

        functions.logger.log('entity metadata created', entityUpdate);

        const result = { customer: response.id };
        res.status(200).json();

        return result;
      } else {
        res.status(204).send();

      }
    });

  });

});

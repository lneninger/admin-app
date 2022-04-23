// import { IConfig } from './../../functions.models';
import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
// import { Stripe } from 'stripe';
import * as Cors from 'cors';
import { logHttp } from '../../site/log-wrapper-function';
// import { DocumentMetadata } from 'plaid';
import { accessDomains } from '../../config/access-domains';

const cors = Cors({ origin: accessDomains });

// const stripe = new Stripe(functions.config().stripe.secretkey, { apiVersion: (functions.config() as IConfig).stripe.apiversion });

export const subscriptionCreatedWebhook = functions.https.onRequest((req: functions.https.Request, res: functions.Response) => {

  return cors(req, res, async () => {

    return logHttp(req, res, 'subscriptionCreatedWebhook', async () => {

      const data = <ISubscriptionCreated>req.body.data;
      console.log('Mapped to model', data, 'original body', req.body);

      await admin.firestore().collection('/stripe-webhooks').add(data);
      res.status(200).json();

      return null;

      // let userData: DocumentMetadata | undefined;
      // try {
      //   userData = (await admin.firestore().collection('/entities').doc(data.userId).get());
      // } catch (eror) {
      //   userData = undefined;
      // }
      // if (!userData || !userData.data()?.paymentId) {

      //   console.log('Creating customer');
      //   const customer: Stripe.CustomerCreateParams = {
      //     email: data.email,
      //     name: data.fullName
      //   };

      //   const response = await stripe.customers.create(customer);
      //   // console.log('Customer Create Response:', response);

      //   // add payment id claim
      //   const auth = admin.auth();
      //   const userRecord = await auth.getUser(data.userId);
      //   let claims = userRecord.customClaims || {};
      //   claims = { ...claims, paymentId: response.id };
      //   await auth.setCustomUserClaims(data.userId, claims);

      //   // add payment id to entity metadata
      //   const entityUpdate = { paymentId: response.id };
      //   try {
      //     await admin.firestore().collection('/entities').doc(data.userId).update(entityUpdate);
      //   } catch (error) {
      //     await admin.firestore().collection('/entities').doc(data.userId).set(entityUpdate);
      //   }

      //   functions.logger.log('entity metadata created', entityUpdate);

      //   const result = { customer: response.id };

      //   res.status(200).json();

      //   return result;
      // } else {
      //   console.log('Customer already exists');

      //   res.status(204).json({});

      //   return null;
      // }
    });

  });

});


interface ISubscriptionCreated {
  object: {
    id: string;
    customer: string;
  }
  previous_attributes: { [key: string]: string };
}

interface ISubscriptionUpdated {
  object: {
    id: string;
    customer: string;
  }
  previous_attributes: { [key: string]: string };
}
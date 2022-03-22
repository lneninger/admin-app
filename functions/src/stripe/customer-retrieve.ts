import * as Cors from 'cors';
import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';
import { Stripe } from 'stripe';

import { logHttp } from '../site/log-wrapper-function';
import { IUserPaymentMetadata } from './../../../src/app/main/services/user/user.models';
import { IConfig } from './../functions.models';
import { IPaymentMethodListInputModel } from './payment.models';

const cors = Cors({ origin: true });

const stripe = new Stripe(functions.config().stripe.secretkey, { apiVersion: (functions.config() as IConfig).stripe.apiversion });

export const customerRetrieve = functions.https.onRequest((req: functions.https.Request, res: functions.Response) => {

  return cors(req, res, async () => {

    return logHttp(req, res, 'customerRetrieve', async () => {

      const data = <IPaymentMethodListInputModel>req.body.data;
      console.log('Mapped to model', data, 'original body', req.body);


      let userData: IUserPaymentMetadata | undefined;
      try {
        userData = (await admin.firestore().collection('/entities').doc(data.userId).get()).data() as IUserPaymentMetadata;
      } catch (eror) {
        userData = undefined;
      }
      if (userData && userData.paymentId) {

        console.log('Retrieving customer');
        const options: Stripe.RequestOptions = {
        };


        console.log('before sources call');
        try {
          const response = await stripe.customers.retrieve(userData.paymentId, options);
          console.log('customer response: ', response);

          console.log('customer: ', response);
          const result = { data: response };
          res.status(200).json(result);

          return result;
        } catch (error) {
          console.log('Error retrieving ', error)
          throw error;
        }
      } else {
        console.log('No paymentId');
        return res.status(204).json({});
      }
    });

  });

});

import * as Cors from 'cors';
import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';
import { Stripe } from 'stripe';
import { accessDomains } from '../config/access-domains';

import { logHttp } from '../site/log-wrapper-function';
import { IPaymentInputModel } from './payment.models';

const cors = Cors({ origin: accessDomains });

const stripe = new Stripe(functions.config().stripe.token, { apiVersion: '2020-08-27' });
const currency = functions.config().stripe.currency || 'USD';

export const anonymousPayment = functions.https.onRequest((req: functions.https.Request, res: functions.Response) => {

  return cors(req, res, async () => {
    return logHttp(req, res, 'anonymousPayment', async () => {

      const data = <IPaymentInputModel>req.body.data;

      console.log('Mapped to model', data, 'original body', req.body);


      const intent: Stripe.PaymentIntentCreateParams = {
        amount: data.amount,
        currency: currency,
        payment_method_types: ['card'],
      };


      console.log('Sending donation:', intent);

      const response = await stripe.paymentIntents.create(intent);
      console.log('Donation Response:', response);

      await admin.firestore().collection('/payment-log').add(intent);
      console.info('transaction saved successfully');


      const result = response;
      res.status(200).jsonp({ data: result });
      return result;

    });

  });


});

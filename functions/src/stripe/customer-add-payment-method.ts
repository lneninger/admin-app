import { ICustomerAddPaymentMethodInputModel, IUserPaymentConfig } from './payment.models';
import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import { Stripe } from 'stripe';
import * as Cors from 'cors';

const cors = Cors({ origin: true });

const stripe = new Stripe(functions.config().stripe.token, { apiVersion: '2020-08-27' });

export const customerAddPaymentMethod = functions.https.onRequest((req: functions.https.Request, res: functions.Response) => {

  return cors(req, res, async () => {

    const data = <ICustomerAddPaymentMethodInputModel>req.body.data;

    console.log('Mapped to model', data, 'original body', req.body);

    const paymentConfig = (await admin.database().ref(`/user-payment-configs/${data.userId}`).get()).val() as IUserPaymentConfig;

    const input: Stripe.SetupIntentCreateParams = {
      confirm: false,
      usage: 'off_session',
      customer: paymentConfig.customerId,
      payment_method_types: ['card']

    };

    const response = await stripe.setupIntents.create(input);
    console.log('SetupIntent Create Response:', response);

    try {
      await admin.database().ref(`/user-payment-configs/${data.userId}/setup-intents`).push(response);
      res.status(200).jsonp({ data: response });

    } catch (error) {
      res.status(500).jsonp(error);
    }


  })

});

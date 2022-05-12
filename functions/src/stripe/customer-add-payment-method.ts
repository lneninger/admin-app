import { ICustomerAddPaymentMethodInputModel, IUserPaymentConfig } from './payment.models';
import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import { Stripe } from 'stripe';
import * as Cors from 'cors';
import { accessDomains } from '../config/access-domains';

const cors = Cors({ origin: accessDomains });

const stripe = new Stripe(functions.config().stripe.token, { apiVersion: '2020-08-27' });

export const customerAddPaymentMethod = functions.https.onRequest((req: functions.https.Request, res: functions.Response) => {

  return cors(req, res, async () => {

    const data = <ICustomerAddPaymentMethodInputModel>req.body.data;

    console.log('Mapped to model', data, 'original body', req.body);


     try {
    const subscriptionResult = await customerAddPaymentMethodCore(data);
    res.status(200).jsonp({ data: subscriptionResult });

  } catch (error) {
    res.status(500).jsonp(error);
  }

  })

});

export async function customerAddPaymentMethodCore(input: ICustomerAddPaymentMethodInputModel){
  const paymentConfig = (await admin.firestore().doc(`/user-payment-configs/${input.userId}`).get()).data() as IUserPaymentConfig;

  const stInput: Stripe.SetupIntentCreateParams = {
    confirm: false,
    usage: 'off_session',
    customer: paymentConfig.customerId,
    payment_method_types: ['card']
  };

  const response = await stripe.setupIntents.create(stInput);
  console.log('SetupIntent Create Response:', response);

  await admin.firestore().collection(`/user-payment-configs/${input.userId}/setup-intents`).add(response);
  return response;
}

import * as Cors from 'cors';
import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';
import { Stripe } from 'stripe';

import { IUserPaymentMetadata } from '../../../src/app/main/services/user/user.models';
import { accessDomains } from '../config/access-domains';
import { logHttp } from '../site/log-wrapper-function';
import { IConfig } from './../functions.models';
import { ICheckoutSessionCreateInputModel } from './checkout-create.models';
import { customerCreateCore } from './customer-create';

const cors = Cors({ origin: accessDomains });

const stripe = new Stripe(functions.config().stripe.secretkey, { apiVersion: (functions.config() as IConfig).stripe.apiversion });

export const checkoutSessionCreate = functions.https.onRequest((req: functions.https.Request, res: functions.Response) => {

  return cors(req, res, async () => {

    return logHttp(req, res, 'checkoutSessionCreate', async () => {

      const data = <ICheckoutSessionCreateInputModel>req.body.data;

      let userData: IUserPaymentMetadata | undefined;
      try {
        userData = (await admin.firestore().collection('/entities').doc(data.userId).get()).data() as IUserPaymentMetadata;
      } catch (eror) {
        userData = undefined;
      }

      const customer = await customerCreateCore(data.userId);

      if (customer) {
        if (!userData?.subscriptionId) {
          try {
            console.log('Creating checkout session');
            const sessionParams: Stripe.Checkout.SessionCreateParams = {
              success_url: data.successUrl,
              cancel_url: data.cancelUrl,
              customer: userData?.paymentId,
              line_items: data.lineItems.map(item => ({ price: item.priceId, quantity: item.quantity })),
              mode: 'subscription'
            };

            const response = await stripe.checkout.sessions.create(sessionParams);

            functions.logger.log('checkout session created', response.id);

            const result = { sessionId: response.id };

            res.status(200).json({ data: result });

            return result;
          }
          catch (error) {
            console.log('Error creating checkout session', error);

            res.status(500).json({});
            return null;
          }
        } else {
          console.log('Already have subscriptions');

          res.status(204).json({});
          return null;
        }
      } else {
        console.log('Customer does not exists');

        res.status(204).json({});

        return null;
      }
    });

  });

});

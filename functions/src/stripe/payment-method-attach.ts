import * as Cors from 'cors';
import { response } from 'express';
import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';
import { Configuration, PlaidApi, PlaidEnvironments } from 'plaid';
import { Stripe } from 'stripe';

import { IConfig } from '../functions.models';
import { logHttp } from '../site/log-wrapper-function';
import { ICardPaymentSource, ICreateSourceRequestModel, IPaymentMethodPlaidTokenModel, IPaymentMethodRequestModel, IPaymentMethodAttachRequestModel } from './payment.models';

const cors = Cors({ origin: true });
const stripe = new Stripe(functions.config().stripe.secretkey, { apiVersion: (functions.config() as IConfig).stripe.apiversion });


export const paymentMethodAttach = functions.https.onRequest((req: functions.https.Request, res: functions.Response) => {

  return cors(req, res, async () => {

    return logHttp(req, res, 'plaidToken', async () => {

      const data = <IPaymentMethodAttachRequestModel>req.body.data;

      const userData = (await admin.firestore().collection('/entities').doc(data.uid).get()).data();

      const params: Stripe.PaymentMethodAttachParams = {
        customer: userData?.paymentId,
        expand: ['customer'],
      };

      const cardCreateResponse = await stripe.paymentMethods.attach(data.paymentMethodId, params);


      res.status(200).json(cardCreateResponse);

      return cardCreateResponse;
    });

  });

});



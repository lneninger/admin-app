import * as Cors from 'cors';
import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';
import { Stripe } from 'stripe';
import { accessDomains } from '../config/access-domains';

import { IConfig } from '../functions.models';
import { logHttp } from '../site/log-wrapper-function';
import { ICardPaymentSource, ICreateSourceRequestModel } from './payment.models';

const cors = Cors({ origin: accessDomains });

const stripe = new Stripe(functions.config().stripe.secretkey, { apiVersion: (functions.config() as IConfig).stripe.apiversion });


export const sourceCreate = functions.https.onRequest((req: functions.https.Request, res: functions.Response) => {

  return cors(req, res, async () => {

    return logHttp(req, res, 'plaidToken', async () => {

      const data = <ICreateSourceRequestModel>req.body.data;

      switch (data.type) {
        case 'card':
          return await processAttachCard(req, res, data);
      }


      res.status(204).send();
      return null;
    });

  });

});


async function processAttachCard(req: functions.https.Request, res: functions.Response, data: ICreateSourceRequestModel) {
  console.log('stating processAttachCard => ');
  console.log('Mapped to model', data, 'original body', req.body);

  const cardData = data.source as ICardPaymentSource;

  const userData = (await admin.firestore().collection('/entities').doc(data.uid).get()).data();

  const params: Stripe.SourceCreateParams = {
    customer: userData?.paymentId,
    type: 'card',
    token: cardData.token,
    usage: 'reusable'
  };

  // create stripe bank account token
  const cardCreateResponse = await stripe.sources.create(params);
  console.log('cardCreateResponse', cardCreateResponse);

  res.status(200).jsonp(cardCreateResponse);


  return cardCreateResponse;
}


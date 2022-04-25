import * as Cors from 'cors';
import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';

import { accessDomains } from '../../config/access-domains';
import { logHttp } from '../../site/log-wrapper-function';

const cors = Cors({ origin: accessDomains });

export const stripeWebhook = functions.https.onRequest((req: functions.https.Request, res: functions.Response) => {

  return cors(req, res, async () => {

    return logHttp(req, res, 'webhook', async () => {

      await admin.firestore().collection('/stripe-webhooks').add(req.body.data);
      res.status(200).json();
      return null;

    });

  });

});

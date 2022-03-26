import * as Cors from 'cors';
import * as functions from 'firebase-functions';

import { IConfig } from '../functions.models';

const cors = Cors({ origin: true });

export const appInitializer = functions.https.onRequest((req: functions.https.Request, res: functions.Response) => {

  return cors(req, res, async () => {


    const result = {
      stripe: {
        publicKey: (functions.config() as IConfig).stripe.publickey,
        apiVersion: (functions.config() as IConfig).stripe.apiversion,
      },
      plaid: {
        publicKey: (functions.config() as IConfig).plaid.publickey,
        environment: (functions.config() as IConfig).plaid.environment,
      },
    };

    res.status(200).json(result);

  });

});

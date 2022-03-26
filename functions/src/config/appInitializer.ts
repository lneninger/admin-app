import * as functions from 'firebase-functions';
import * as Cors from 'cors';
import { accessDomains } from './access-domains';

const cors = Cors({ origin: accessDomains });

export const appInitializer = functions.https.onRequest((req: functions.https.Request, res: functions.Response) => {

  return cors(req, res, async () => {


    const result = {

    };

    res.status(200).json(result);

  });

});

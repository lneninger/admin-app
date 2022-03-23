import * as functions from 'firebase-functions';
import * as Cors from 'cors';

const cors = Cors({ origin: true });

export const appConfiguration = functions.https.onRequest((req: functions.https.Request, res: functions.Response) => {

  return cors(req, res, async () => {


    const result = {

    };

    res.status(200).json(result);

  });

});

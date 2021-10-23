import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as Cors from 'cors';
import { IUserExists } from './user.models';

const cors = Cors({ origin: true });


export const userExists = functions.https.onRequest((req: functions.https.Request, res: functions.Response) => {

  return cors(req, res, async () => {

    const data = <IUserExists>req.body.data;

    console.log(`Mapped to model`, data, `original body`, req.body);

    //const token = data.source;

    let user = await admin.auth().getUserByEmail(data.email);
    if (!user) {
      user = await admin.auth().getUserByPhoneNumber(data.phoneNumber);
    }

    console.log('User Exists Response:', user);

    res.status(200).jsonp({ data: user });


  });



});

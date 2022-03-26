import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as Cors from 'cors';
import { IUserExists } from './user.models';
import { accessDomains } from '../config/access-domains';

const cors = Cors({ origin: accessDomains });


export const userExists = functions.https.onRequest((req: functions.https.Request, res: functions.Response) => {

  return cors(req, res, async () => {

    const data = <IUserExists>req.body.data;

    console.log('Mapped to model', data, 'original body', req.body);

    let user = await admin.auth().getUserByEmail(data.email);
    if (!user) {
      user = await admin.auth().getUserByPhoneNumber(data.phoneNumber);
    }

    console.log('User Exists Response:', user);

    res.status(200).jsonp({ data: user });


  });

});

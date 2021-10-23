import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as Cors from 'cors';
import { IUserCreate } from './user.models';

const cors = Cors({ origin: true });

export const userCreate = functions.https.onRequest((req: functions.https.Request, res: functions.Response) => {

  return cors(req, res, async () => {

    const data = <IUserCreate>req.body.data;

    console.log(`Mapped to model`, data, `original body`, req.body);

    //const token = data.source;

    const user = await admin.auth().createUser({
      email: data.email,
      emailVerified: false,
      phoneNumber: data.phoneNumber,
      password: data.password,
      displayName: data.displayName,
      photoURL: data.photoUrl,
      disabled: false
    });

    console.log('User Create Response:', user);

    res.status(200).jsonp({ data: user });

  });

});

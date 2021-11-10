import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as Cors from 'cors';
import { IUserAddRole } from './user.models';

const cors = Cors({ origin: true });


export const userAddRole = functions.https.onRequest((req: functions.https.Request, res: functions.Response) => {

  return cors(req, res, async () => {

    const data = <IUserAddRole>req.body.data;

    console.log(`Mapped to model`, data, `original body`, req.body);

    //const token = data.source;

    await admin.auth().setCustomUserClaims(data.uid, { roles: [data.role] });

    console.log('User Get Role Response:', data.role);

    res.status(200);


  });



});

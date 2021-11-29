import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import firebase from 'firebase/app';
import 'firebase/auth';
import * as Cors from 'cors';
import { ISetCurrentRole, ICurrentRole } from './user.models';

const cors = Cors({ origin: true });


export const setCurrentRole = functions.https.onRequest((req: functions.https.Request, res: functions.Response) => {

  return cors(req, res, async () => {

    const data = <ISetCurrentRole>req.body.data;

    console.log(`Mapped to model`, data, `original body`, req.body);

    //const token = data.source;

    const user = firebase.auth().currentUser;
    if (user) {
      const roleName = data.name.toUpperCase();
      await admin.firestore().doc(`auth-users/${user.uid}`).update({ currentRole: roleName } as ICurrentRole);
      res.status(202);
    } else {
      res.status(202);
    }
  });

});

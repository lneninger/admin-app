import * as Cors from 'cors';
import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';

import { IUserRemoveRole } from './user.models';

const cors = Cors({ origin: true });


export const userRemoveRole = functions.https.onRequest((req: functions.https.Request, res: functions.Response) => {

  return cors(req, res, async () => {

    const data = <IUserRemoveRole>req.body.data;

    console.log('Mapped to model', data, 'original body', req.body);

    let removeResult: any;
    if (data.userRoleId) {
      removeResult = await admin.firestore().doc(`auth-users-roles/${data.userRoleId}`).delete();
    } else if (data.roleId) {
      const userRole = (await admin.firestore().collection('auth-users-roles').where('roleId', '==', data.roleId).limit(1).get()).docs.at(0);
      if (userRole) {
        removeResult = await admin.firestore().doc(`auth/users-roles/${userRole.id}`).delete();
      }
    } else if (data.role) {
      const role = (await admin.firestore().collection('auth-roles').where('name', '==', data.role).limit(1).get()).docs.at(0);
      if (role) {
        const userRole = (await admin.firestore().collection('auth-users-roles').where('roleId', '==', role.id).limit(1).get()).docs.at(0);
        if (userRole) {
          removeResult = await admin.firestore().doc(`auth-users-roles/${userRole.id}`).delete();
        }
      }
    }

    console.log('Operation result:', removeResult);

    res.status(200).json(removeResult);


  });



});

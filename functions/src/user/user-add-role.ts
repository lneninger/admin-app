import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as Cors from 'cors';
import { IUserAddRole } from './user.models';

const cors = Cors({ origin: true });


export const attachRole = functions.https.onRequest((req: functions.https.Request, res: functions.Response) => {

  return cors(req, res, async () => {

    const data = <IUserAddRole>req.body.data;

    console.log(`Mapped to model`, data, `original body`, req.body);

    //const token = data.source;

    const roleName = data.role.toUpperCase();
    const role = (await admin.firestore().collection(`/auth/roles`).where('name', '==', roleName).limit(1).get()).docs.at(0);
    let roleId: string;
    if (role) {
      roleId = role.id
    } else {
      const newRole = (await admin.firestore().collection(`/auth/roles`).add({ name: roleName }));
      roleId = newRole.id;
    }

    if (data.uid) {
      const relationshipRef = (await admin.firestore().collection(`/auth/users-roles`).add({ userId: data.uid, roleId }));
      const relationship = await relationshipRef.get();
      console.log('Attach role response:', relationship);

      res.status(200).json(relationship);
    } else {
      console.log('Add role response:', roleId);

      res.status(200).json({ roleId });
    }




  });



});

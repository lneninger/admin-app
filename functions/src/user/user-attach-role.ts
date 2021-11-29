import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as Cors from 'cors';
import { IAttachRole, IUserRole } from './user.models';

const cors = Cors({ origin: true });


export const attachRole = functions.https.onRequest((req: functions.https.Request, res: functions.Response) => {

  return cors(req, res, async () => {

    const data = <IAttachRole>req.body.data;

    const result = await attachRoleCore(data);

    res.status(200).json(result);

  });

});


export async function attachRoleCore(data: IAttachRole): Promise<admin.firestore.DocumentSnapshot<admin.firestore.DocumentData> | {roleId: string}> {
  console.log(`Mapped to model`, data, `original body`, data);

  //const token = data.source;
  const roleName = data.role.toUpperCase();
  const role = (await admin.firestore().collection(`auth-roles`).where('name', '==', roleName).limit(1).get()).docs[0];
  let roleId: string;
  if (role) {
    roleId = role.id;
  } else {
    const newRole = (await admin.firestore().collection(`auth-roles`).add({ name: roleName }));
    roleId = newRole.id;
  }

  if (data.uid) {
    const relationshipRef = (await admin.firestore().collection(`auth-users-roles`).add({ userId: data.uid, roleId } as IUserRole));
    const relationship = await (await relationshipRef.get()).data() as IUserRole;
    console.log('Attach role response:', relationship);

    // add claims
    const userRecord = await admin.auth().getUser(data.uid);
    let claims = userRecord.customClaims || {};
    const roles = (claims.roles || []) as string[];
    if (roles.indexOf(roleName) === -1) {
      roles.push(roleName);
      claims = { ...claims, roles };
      await admin.auth().setCustomUserClaims(data.uid, claims);
    }

    return relationship;
  } else {
    console.log('Add role response:', roleId);

    return { roleId };
  }
}


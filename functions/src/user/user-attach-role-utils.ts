import * as admin from 'firebase-admin';
import { UserService } from '../_services/users/user.service';
import { IAttachRole, IUserRole } from './user.models';



export async function attachRoleCore(data: IAttachRole): Promise<admin.firestore.DocumentSnapshot<admin.firestore.DocumentData> | { roleId: string; }> {
  console.log('Mapped to model', data, 'original body', data);
  const userService = new UserService();

  const roleName = data.role.toUpperCase();
  const role = (await admin.firestore().collection('auth-roles').where('name', '==', roleName).limit(1).get()).docs[0];
  let roleId: string;
  if (role) {
    roleId = role.id;
  } else {
    const newRole = (await admin.firestore().collection('auth-roles').add({ name: roleName }));
    roleId = newRole.id;
  }

  if (data.uid) {
    const relationshipRef = (await admin.firestore().collection('auth-users-roles').add({ userId: data.uid, roleId } as IUserRole));
    const relationship = await (await relationshipRef.get()).data() as IUserRole;
    console.log('Attach role response:', relationship);

    // add claims
    const auth = admin.auth();
    const userRecord = await auth.getUser(data.uid);

    const roles: string[] = userRecord.customClaims?.roles || [];

    if (roles.indexOf(roleName) === -1) {
      roles.push(roleName);
      await userService.updateUserClaims(userRecord, { roles });
    }

    return relationship;
  } else {
    console.log('Add role response:', roleId);

    return { roleId };
  }
}

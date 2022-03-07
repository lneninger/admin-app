import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
// import firebase from 'firebase/app';
import 'firebase/auth';
import * as Cors from 'cors';
import { IRole, IUserRole } from '../user/user.models';
import { IAppExternalConfiguration, ISecuredModule } from './site.models';
import { getAuth } from 'firebase/auth';

const cors = Cors({ origin: true });

export const appConfiguration = functions.https.onRequest((req: functions.https.Request, res: functions.Response) => {

  return cors(req, res, async () => {
    try {
      let userRoleIds: string[] = [];

      const user = getAuth().currentUser;
      // const user = firebase.auth().currentUser;
      if (user) {
        console.log(`Authenticated user: ${user.displayName}`);
        const userRolesRel = (await admin.firestore().collection('auth-users-roles').where('userId', '==', user?.uid).get()).docs;
        userRoleIds = userRolesRel.map(item => (item.data() as IUserRole).roleId);
      }
      else {
        console.log('No authenticated user');
      }

      let userRoles: string[] = [];
      let roles: IRole[] = [];
      if (userRoleIds.length) {
        userRoles = (await admin.firestore().collection('auth-roles').where('id', 'in', userRoleIds).get()).docs.map(item => (item.data as IRole).name);
      }
      roles = (await admin.firestore().collection('auth-roles').get()).docs.map(item => item.data() as IRole);

      const modules = (await admin.firestore().collection('app-secured-modules').get()).docs.map(item => item.data() as ISecuredModule);


      res.status(200).json({ roles, userRoles, modules } as IAppExternalConfiguration);
    } catch (error) {
      res.status(500).json(error);
    }
  });

});

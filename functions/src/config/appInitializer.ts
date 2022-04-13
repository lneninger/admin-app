import * as Cors from 'cors';
import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

import { IConfig } from '../functions.models';
import { IRole, IUserRole } from '../user/user.models';
import { getAuth } from 'firebase/auth';
import { ISecuredModule } from '../site/site.models';
import { logHttp } from '../site/log-wrapper-function';

const cors = Cors({ origin: true });
const firestore = admin.firestore();

export const appInitializer = functions.https.onRequest((req: functions.https.Request, res: functions.Response) => {

  return cors(req, res, async () => {
    return logHttp(req, res, 'appInitializer', async () => {
      let result: {[key: string ]: any} = {};

      try {
        //#region user configuration
        let userRoleIds: string[] = [];

        const user = getAuth().currentUser;
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
        //#endregion


        result = {
          environment: {
            appTitle: (functions.config() as IConfig).environment.apptitle
          },
          stripe: {
            publicKey: (functions.config() as IConfig).stripe.publickey,
            apiVersion: (functions.config() as IConfig).stripe.apiversion,
          },
          plaid: {
            publicKey: (functions.config() as IConfig).plaid.publickey,
            environment: (functions.config() as IConfig).plaid.environment,
          },
          roles, userRoles, modules
        };

        res.status(200).json(result);
      } catch (error) {
        res.status(500).json(error);
      }

      return result;

    });

  });

});

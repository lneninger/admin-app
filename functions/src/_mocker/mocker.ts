import 'firebase/auth';

import * as Cors from 'cors';
import * as admin from 'firebase-admin';
import { CreateRequest } from 'firebase-admin/lib/auth/auth-config';
import { UserRecord } from 'firebase-admin/lib/auth/user-record';
import * as functions from 'firebase-functions';

import { ISecuredModule, IUserSecuredModule } from '../site/site.models';
import { attachRoleCore } from '../user/user-attach-role-utils';
import { mockedSignUp } from './mocker.models';





const cors = Cors({ origin: true });
const auth = admin.auth();
const firestore = admin.firestore();
export const dataMocker = functions.https.onRequest((req: functions.https.Request, res: functions.Response) => {

  return cors(req, res, async () => {
    try {

      let createUserResult: UserRecord;
      let userId: string;

      let user: UserRecord = null as unknown as UserRecord;
      try {
        user = await auth.getUserByEmail(mockedSignUp.email);
      } catch (error) {
        // console.log('auth.getUserByEmail: ', error);
      }

      if (user) {
        userId = user.uid;
      } else {
        createUserResult = await auth.createUser({ /*uid: mockedSignUp.email, */email: mockedSignUp.email, password: mockedSignUp.password, phoneNumber: mockedSignUp.phoneNumber, photoURL: mockedSignUp.photoUrl, metadata: null } as CreateRequest);
        userId = createUserResult.uid;
      }

      await attachRoleCore({ uid: userId, role: 'Admin' });

      //#endregion

      //#region Modules
      const userModuleCollection = firestore.collection('app-users-secured-modules');
      let add: boolean;
      const moduleCollection = firestore.collection('app-secured-modules');
      try {
        add = ! (await moduleCollection.doc('AXIE-INFINITY').get()).data();
      } catch {
        add = true;
      }
      if (add) {
        await moduleCollection.doc('AXIE-INFINITY').set({
          name: 'AXIE-INFINITY',
          displayName: 'Axie Infinity',
          path: 'axie-infinity',
          icon: 'pets',
        } as ISecuredModule);

        await userModuleCollection.add({
          userId,
          moduleId: 'AXIE-INFINITY'//axieInfinitySecured.id,
        } as IUserSecuredModule);
      }

      //#endregion
      res.status(202).end();

    } catch (error) {
      res.status(500).json(error);
    }


  });

});



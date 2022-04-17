import 'firebase/auth';

import * as Cors from 'cors';
import * as admin from 'firebase-admin';
import { CreateRequest } from 'firebase-admin/lib/auth/auth-config';
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

      let userId: string;

      try {
        const user = await auth.getUserByEmail(mockedSignUp.email);
        userId = user.uid;
      } catch (error) {
        userId = undefined as unknown as string;
      }

      if (!userId) {
        const createUserResult = await auth.createUser({ email: mockedSignUp.email, password: mockedSignUp.password, phoneNumber: mockedSignUp.phoneNumber, photoURL: mockedSignUp.photoUrl, metadata: null } as CreateRequest);
        userId = createUserResult.uid;
      }

      await attachRoleCore({ uid: userId, role: 'Admin' });
      //#endregion

      //#region Modules
      const userModuleCollection = firestore.collection('app-users-secured-modules');
      const moduleCollection = firestore.collection('app-secured-modules');

      if (!(await moduleCollection.doc('AXIE-INFINITY').get()).exists) {

        await moduleCollection.doc('AXIE-INFINITY').set({
          name: 'AXIE-INFINITY',
          displayName: 'Axie Infinity',
          path: 'axie-infinity',
          icon: 'pets',
        } as ISecuredModule);

        await userModuleCollection.add({
          userId,
          moduleId: 'AXIE-INFINITY'
        } as IUserSecuredModule);
      }
      //#endregion


      //#region Subscriptions
      if ((await firestore.collection('app-subscriptions').get()).empty) {

        const subscriptions = firestore.collection('app-subscriptions');
        // BASIC
        let sub = await subscriptions.add({
          name: 'BASIC',
          order: 1,
          icon: 'thumb_up',
          description: 'Entry level subscription. Offers the lowest cost which allow the customer to get confortable with the platform.',
          price: 1.99,
          activateDate: new Date()
        });
        let details = sub.collection('details');
        await details.add({ description: 'Monthly payment' });
        await details.add({ description: 'Service review' });
        await details.add({ description: 'Automatic calendar' });
        await details.add({ description: 'Access to the history of services' });

        // PROD
        sub = await subscriptions.add({
          name: 'PRO',
          order: 2,
          icon: 'work',
          description: 'Enhance your experience accessing to more features.',
          price: 4.99,
          activateDate: new Date()
        });
        details = sub.collection('details');
        await details.add({ description: 'All from BASIC subscription' });
        await details.add({ description: 'First level support' });

        // ADVANCED
        sub = await subscriptions.add({
          name: 'ADVANCED',
          order: 3,
          icon: 'star_border',
          description: 'Full access to the system capabilities.',
          price: 9.99,
          activateDate: new Date()
        });
        details = sub.collection('details');
        await details.add({ description: 'All from PRO subscription' });
        await details.add({ description: 'Third level support' });
      }
      //#endregion


      res.status(202).json({});

    } catch (error) {
      res.status(500).json(error);
    }


  });

});



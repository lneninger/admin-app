import * as Cors from 'cors';
import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';
import { Stripe } from 'stripe';

import { IUserPaymentMetadata } from '../../../../src/app/main/services/user/user.models';
import { accessDomains } from '../../config/access-domains';
import { IConfig } from '../../functions.models';
import { logHttp } from '../../site/log-wrapper-function';
import { ISubscriptionGetByUserRequest } from './subscription-get-by-user.models';

const cors = Cors({ origin: accessDomains });

const stripe = new Stripe(functions.config().stripe.secretkey, { apiVersion: (functions.config() as IConfig).stripe.apiversion });

export const subscriptionGetByUser = functions.https.onRequest((req: functions.https.Request, res: functions.Response) => {

  return cors(req, res, async () => {

    return logHttp(req, res, 'subscriptionGetByUser', async () => {

      const data = <ISubscriptionGetByUserRequest>req.body.data;

      try {
        const localSubscription = subscriptionGetByUserCore(data);
        if (localSubscription) {
          res.status(200).json({ data: localSubscription });
          return localSubscription;
        } else {
          res.status(204).json({});
          return null;
        }
      } catch (error) {
        res.status(400).json(error);

      }
    });

  });

});


export async function subscriptionGetByUserCore(input: ISubscriptionGetByUserRequest | string): Promise<{ id: string, data: any, $original: any } | undefined> {
  let userData: IUserPaymentMetadata | undefined;

  let userId: string | undefined;
  let tryFromSource: boolean | undefined;
  if (input) {
    if (typeof input === 'string') {
      userId = input;
    } else {
      userId = input.userId;
      tryFromSource = input.tryFromSource;
    }
  }

  if (userId) {
    try {
      userData = (await admin.firestore().collection('/entities').doc(userId).get()).data() as IUserPaymentMetadata;
    } catch (eror) {
      userData = undefined;
    }


    let localSubscription: ({ id: string, data: any, $original: any }) | undefined = undefined;

    if (userData?.paymentId) {
      if (!userData.subscriptionId || !userData.st_subscriptionid) {
        if (tryFromSource) {
          const customer = await stripe.customers.retrieve(userData.paymentId) as unknown as Stripe.Customer;
          const localSubscriptions = (await admin.firestore().collection('/app-subscriptions').get()).docs.map(doc => ({ id: doc.id, data: doc.data(), $original: doc }));

          let subscription: Stripe.Subscription | undefined;
          if (customer.subscriptions?.data?.length) {
            for (const subscriptionItem of customer.subscriptions?.data) {
              for (const localSubscriptionItem of localSubscriptions) {
                if (subscriptionItem.items.data.some(subProductItem => subProductItem.plan.product === localSubscriptionItem.$original.data().st_prodid)) {
                  localSubscription = localSubscriptionItem;
                  subscription = subscriptionItem;
                  break;
                }
                if (localSubscription != null) {
                  break;
                }
              }
            }
          }

          if (localSubscription) {
            await admin.firestore().collection('/entities').doc(userId).update({ subscriptionId: localSubscription.id, st_subscriptionid: subscription?.id } as IUserPaymentMetadata)
          }
        }
      } else {
        const temp = (await admin.firestore().collection('/app-subscriptions').doc(userData.subscriptionId).get());
        localSubscription = ({ id: temp.id, data: temp.data(), $original: temp });
      }

      return localSubscription;
    }

    throw new Error('customer doesn\'t have payment registration');
  }

  throw new Error('Parameter error. No user id');
}

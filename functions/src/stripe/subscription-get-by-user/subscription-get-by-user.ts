import * as Cors from 'cors';
import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';
import { Stripe } from 'stripe';

import { IUserPaymentMetadata } from '../../../../src/app/main/services/user/user.models';
import { accessDomains } from '../../config/access-domains';
import { FirestoreDocumentMapping, IConfig } from '../../functions.models';
import { logHttp } from '../../site/log-wrapper-function';
import { ISubscriptionGetByUserRequest } from './subscription-get-by-user.models';

const cors = Cors({ origin: accessDomains });

const stripe = new Stripe(functions.config().stripe.secretkey, { apiVersion: (functions.config() as IConfig).stripe.apiversion });

export const subscriptionGetByUser = functions.https.onRequest((req: functions.https.Request, res: functions.Response) => {

  return cors(req, res, async () => {

    return logHttp(req, res, 'subscriptionGetByUser', async () => {

      const data = <ISubscriptionGetByUserRequest>req.body.data;

      try {
        const localSubscription = await subscriptionGetByUserCore(data);
        if (localSubscription) {
          res.status(200).json({ data: localSubscription });
          return localSubscription;
        } else {
          res.status(204).json({});
          return null;
        }
      } catch (error) {
        res.status(400).json(error);
        return null;
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


    let localSubscription: FirestoreDocumentMapping<any> | undefined = undefined;

    if (userData?.paymentId) {
      if (!userData.subscriptionId || !userData.st_subscriptionid) {
        if (tryFromSource) {
          const subscriptions = await getCustomerSubscriptionsCore(userData.paymentId);
          const subscription = subscriptions[0];
          if (subscription) {
            await admin.firestore().collection('/entities').doc(userId).update({ subscriptionId: subscription.localSubscriptionItem.id, st_subscriptionid: subscription.subscriptionItem.id } as IUserPaymentMetadata);
            localSubscription = subscription.localSubscriptionItem;
          }
        }
      } else {
        const temp = (await admin.firestore().collection('/app-subscriptions').doc(userData.subscriptionId).get());
        localSubscription = ({ id: temp.id, data: temp.data(), $original: temp } as FirestoreDocumentMapping<any>);
      }

      return localSubscription;
    }

    throw new Error('customer doesn\'t have payment registration');
  }

  throw new Error('Parameter error. No user id');
}

export async function getCustomerSubscriptionsCore(customerId: string): Promise<{ subscriptionItem: Stripe.Subscription, localSubscriptionItem: FirestoreDocumentMapping<any> }[]> {
  const result: { localSubscriptionItem: FirestoreDocumentMapping<any>, subscriptionItem: Stripe.Subscription }[] = [];
  const customer = await stripe.customers.retrieve(customerId, { expand: ['subscriptions'] }) as unknown as Stripe.Customer;
  const localSubscriptions = (await admin.firestore().collection('/app-subscriptions').get()).docs.map(doc => ({ id: doc.id, data: doc.data(), $original: doc }));
  //const localSubscriptionItemIds = localSubscriptions.map(item => ({ productId: item.id, st_prodid: item.data.st_prodid }));
  if (customer.subscriptions?.data?.length) {

    let subscriptionMapping = customer.subscriptions?.data.map(subscriptionItem => ({ subscriptionItem, localSubscriptionItem: localSubscriptions.find(localSubscriptionItem => subscriptionItem.items.data.some(subProductItem => localSubscriptionItem.data.st_prodid === subProductItem.plan.product)) }))
    subscriptionMapping = subscriptionMapping.filter(item => item.subscriptionItem);
    return subscriptionMapping;
  }
}

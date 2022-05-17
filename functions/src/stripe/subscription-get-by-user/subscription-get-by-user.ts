import { DocumentData } from '@angular/fire/firestore/firebase';
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


export async function subscriptionGetByUserCore(input: ISubscriptionGetByUserRequest | string): Promise<FirestoreDocumentMapping<DocumentData> | undefined> {

  if (input) {
    let userId = input as string;
    let tryFromSource: boolean | undefined;

    if (typeof input !== 'string') {
      userId = input.userId;
      tryFromSource = input.tryFromSource;
    }

    if (userId) {
      const userDataRef = (await admin.firestore().collection('/entities').doc(userId).get());
      const userData = userDataRef.exists ? ({ id: userDataRef.id, data: userDataRef.data() as IUserPaymentMetadata }) : undefined;

      if (userData?.data.paymentId) {
        let localSubscription: FirestoreDocumentMapping<DocumentData> | undefined = undefined;

        if (!userData.data.subscriptionId || !userData.data.st_subscriptionid) {
          localSubscription = tryFromSource ? await updateSuvscriptionFromStripe(userData) : undefined;
        } else {
          const temp = (await admin.firestore().collection('/app-subscriptions').doc(userData.data.subscriptionId).get());
          localSubscription = { id: temp.id, data: temp.data(), $original: temp } as FirestoreDocumentMapping<DocumentData>;
        }

        return localSubscription;
      }

      throw new Error('customer doesn\'t have payment registration');
    }
  }


  throw new Error('Parameter error. No user id');
}

export async function updateSuvscriptionFromStripe(userData: { id: string, data: IUserPaymentMetadata }) {
  const subscription = (await getCustomerSubscriptionsCore(userData.data.paymentId))?.at(0);
  if (subscription) {
    await admin.firestore().collection('/entities').doc(userData.id).update({ subscriptionId: subscription.localSubscriptionItem.id, st_subscriptionid: subscription.subscriptionItem.id } as IUserPaymentMetadata);
    return subscription.localSubscriptionItem;
  }

  return undefined;
}


export async function getCustomerSubscriptionsCore(customerId: string): Promise<{ subscriptionItem: Stripe.Subscription, localSubscriptionItem: FirestoreDocumentMapping<DocumentData> }[] | undefined> {
  const customer = await stripe.customers.retrieve(customerId, { expand: ['subscriptions'] }) as unknown as Stripe.Customer;
  const localSubscriptions = (await admin.firestore().collection('/app-subscriptions').get()).docs.map(doc => ({ id: doc.id, data: doc.data(), $original: doc } as FirestoreDocumentMapping<DocumentData>));
  if (customer.subscriptions?.data?.length) {

    let subscriptionMapping: { subscriptionItem: Stripe.Subscription, localSubscriptionItem: FirestoreDocumentMapping<DocumentData> }[] = customer.subscriptions?.data.map(subscriptionItem => ({ subscriptionItem, localSubscriptionItem: localSubscriptions.filter(localSubscriptionItem => subscriptionItem.items.data.some(subProductItem => localSubscriptionItem.data.st_prodid === subProductItem.plan.product))[0] }))
    subscriptionMapping = subscriptionMapping.filter(item => item.localSubscriptionItem);
    return subscriptionMapping;
  }

  return undefined;
}

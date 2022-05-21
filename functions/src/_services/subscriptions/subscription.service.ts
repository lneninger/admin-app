import { DocumentData } from '@angular/fire/firestore/firebase';
import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';
import { Stripe } from 'stripe';

import { IUserPaymentMetadata } from '../../../../src/app/main/services/user/user.models';
import { FirestoreDocumentMapping, IConfig } from '../../functions.models';
import { ISubscriptionGetByUserRequest } from '../../stripe/subscription-get-by-user/subscription-get-by-user.models';
import { ISubscriptionItem } from './subscription.models';

const stripe = new Stripe(functions.config().stripe.secretkey, { apiVersion: (functions.config() as IConfig).stripe.apiversion });

export class SubscriptionService {
  async subscriptionGetByUserCore(input: ISubscriptionGetByUserRequest | string): Promise<FirestoreDocumentMapping<DocumentData> | undefined> {

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
          let localSubscription: FirestoreDocumentMapping<ISubscriptionItem> | undefined = undefined;

          if (!userData.data.subscriptionId || !userData.data.st_subscriptionid) {
            localSubscription = tryFromSource ? await this.updateSubscriptionFromStripe(userData) : undefined;
          } else {
            const temp = (await admin.firestore().collection('/app-subscriptions').doc(userData.data.subscriptionId).get());
            localSubscription = { id: temp.id, data: temp.data() as ISubscriptionItem, $original: temp } as FirestoreDocumentMapping<ISubscriptionItem>;
          }

          return localSubscription;
        }

        throw new Error('customer doesn\'t have payment registration');
      }
    }


    throw new Error('Parameter error. No user id');
  }

  async updateSubscriptionFromStripe(userData: { id: string, data: IUserPaymentMetadata }): Promise<FirestoreDocumentMapping<ISubscriptionItem> | undefined> {
    const subscription = (await this.getCustomerSubscriptionsCore(userData.data.paymentId))?.at(0);
    if (subscription) {
      await admin.firestore().collection('/entities').doc(userData.id).update({ subscriptionId: subscription.localSubscriptionItem?.id, st_subscriptionid: subscription.subscriptionItem.id } as IUserPaymentMetadata);
      return subscription.localSubscriptionItem;
    }

    return undefined;
  }


  async getCustomerSubscriptionsCore(customerId: string): Promise<{ subscriptionItem: Stripe.Subscription, localSubscriptionItem: FirestoreDocumentMapping<ISubscriptionItem> | undefined }[] | undefined> {
    const customer = await stripe.customers.retrieve(customerId, { expand: ['subscriptions'] }) as unknown as Stripe.Customer;
    if (customer.subscriptions?.data?.length) {
      const subscriptionMapping: { subscriptionItem: Stripe.Subscription, localSubscriptionItem: FirestoreDocumentMapping<ISubscriptionItem> | undefined }[] = [];
      for (const subscriptionItem of customer?.subscriptions.data) {
        subscriptionMapping.push({ subscriptionItem, localSubscriptionItem: await this.getLocalSubscriptionByStripeSubscriptions(subscriptionItem) })
      }
      return subscriptionMapping.filter(item => item.localSubscriptionItem);
    }

    return undefined;
  }

  async getLocalSubscriptionByStripeSubscriptions(stripeSubscription: Stripe.Subscription): Promise<FirestoreDocumentMapping<ISubscriptionItem> | undefined> {
    const localSubscriptions = (await admin.firestore().collection('/app-subscriptions').get()).docs.map(doc => ({ id: doc.id, data: doc.data() as ISubscriptionItem, $original: doc } as FirestoreDocumentMapping<ISubscriptionItem>));
    return localSubscriptions.find(localSubscriptionItem => stripeSubscription.items.data.some(subProductItem => localSubscriptionItem.data.st_prodid === subProductItem.plan.product));
  }
}

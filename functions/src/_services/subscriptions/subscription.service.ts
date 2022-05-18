import { DocumentData } from '@angular/fire/firestore/firebase';
import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';
import { Stripe } from 'stripe';

import { IUserPaymentMetadata } from '../../../../src/app/main/services/user/user.models';
import { FirestoreDocumentMapping, IConfig } from '../../functions.models';
import { ISubscriptionGetByUserRequest } from '../../stripe/subscription-get-by-user/subscription-get-by-user.models';

const stripe = new Stripe(functions.config().stripe.secretkey, { apiVersion: (functions.config() as IConfig).stripe.apiversion });

export class SubscriptionService{
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
          let localSubscription: FirestoreDocumentMapping<DocumentData> | undefined = undefined;

          if (!userData.data.subscriptionId || !userData.data.st_subscriptionid) {
            localSubscription = tryFromSource ? await this.updateSuvscriptionFromStripe(userData) : undefined;
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

  async updateSuvscriptionFromStripe(userData: { id: string, data: IUserPaymentMetadata }) {
    const subscription = (await this.getCustomerSubscriptionsCore(userData.data.paymentId))?.at(0);
    if (subscription) {
      await admin.firestore().collection('/entities').doc(userData.id).update({ subscriptionId: subscription.localSubscriptionItem.id, st_subscriptionid: subscription.subscriptionItem.id } as IUserPaymentMetadata);
      return subscription.localSubscriptionItem;
    }

    return undefined;
  }


  async getCustomerSubscriptionsCore(customerId: string): Promise<{ subscriptionItem: Stripe.Subscription, localSubscriptionItem: FirestoreDocumentMapping<DocumentData> }[] | undefined> {
    const customer = await stripe.customers.retrieve(customerId, { expand: ['subscriptions'] }) as unknown as Stripe.Customer;
    const localSubscriptions = (await admin.firestore().collection('/app-subscriptions').get()).docs.map(doc => ({ id: doc.id, data: doc.data(), $original: doc } as FirestoreDocumentMapping<DocumentData>));
    if (customer.subscriptions?.data?.length) {

      let subscriptionMapping: { subscriptionItem: Stripe.Subscription, localSubscriptionItem: FirestoreDocumentMapping<DocumentData> }[] = customer.subscriptions?.data.map(subscriptionItem => ({ subscriptionItem, localSubscriptionItem: localSubscriptions.filter(localSubscriptionItem => subscriptionItem.items.data.some(subProductItem => localSubscriptionItem.data.st_prodid === subProductItem.plan.product))[0] }))
      subscriptionMapping = subscriptionMapping.filter(item => item.localSubscriptionItem);
      return subscriptionMapping;
    }

    return undefined;
  }
}

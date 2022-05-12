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

      let userData: IUserPaymentMetadata | undefined;
      try {
        userData = (await admin.firestore().collection('/entities').doc(data.userId).get()).data() as IUserPaymentMetadata;
      } catch (eror) {
        userData = undefined;
      }


      let localSubscription: ({ id: string, data: any, $original: any }) | undefined = undefined;

      if (userData?.paymentId) {
        if (!userData.subscriptionId || !userData.st_subscriptionid) {
          if (data.tryFromSource) {
            const customer = await stripe.customers.retrieve(userData.paymentId) as unknown as Stripe.Customer;
            const localSubscriptions = (await admin.firestore().collection('/app-subscriptions').get()).docs.map(doc => ({ id: doc.id, data: doc.data(), $original: doc }));

            let subscription: Stripe.Subscription | undefined;
            if (customer.subscriptions) {
              for (const subscriptionItem of customer.subscriptions?.data) {
                for (const localSubscriptionItem of localSubscriptions) {
                  if (subscriptionItem.items.data.some(subProductItem => subProductItem.product === localSubscriptionItem.$original.data().st_prodid)){
                    localSubscription = localSubscriptionItem;
                    subscription = subscriptionItem;
                    break;
                  }
                  if(localSubscription != null){
                    break;
                  }
                }
              }
            }

            if(localSubscription){
              await admin.firestore().collection('/entities').doc(data.userId).update({ subscriptionId: localSubscription.id, st_subscriptionid: subscription?.id } as IUserPaymentMetadata)
            }
          }
        } else {
          const temp = (await admin.firestore().collection('/app-subscriptions').doc(userData.subscriptionId).get());
          localSubscription = ({id: temp.id, data: temp.data(), $original: temp});
        }

        if(localSubscription){
          res.status(200).json({ data: localSubscription });
          return localSubscription;
        } else{
          res.status(204).json({});
          return null;
        }
      }
      else
      {
        res.status(204).json({});
          return null;
      }
    });

  });

});

import * as admin from 'firebase-admin';
import { Stripe } from 'stripe';

import { staticImplements } from '../../../functions.models';
import { IWebHookEvent } from '../../../stripe/web-hooks/stripe-webhook.models';
import { SubscriptionService } from '../../subscriptions/subscription.service';
import { UserService } from '../../users/user.service';
import { IStaticStripeWebhookAdapter } from '../abstract-stripe-webhook-adapter';
import { IStripeWebhookAdapter } from '../istripe-webhook-adapter';

@staticImplements<IStaticStripeWebhookAdapter>()
export class StripeWebhookUpdatedSubscriptionAdapter implements IStripeWebhookAdapter {

  static readonly eventType = 'customer.subscription.updated';
  async process(webEvent: IWebHookEvent<Stripe.Subscription>): Promise<void> {
    if (StripeWebhookUpdatedSubscriptionAdapter.eventType === webEvent.type) {
      // const userService = new UserService();
      // const subscriptionService = new SubscriptionService();
      // const subscription = webEvent.data.object;
      // const st_subscriptionid = subscription.id;
      // const customerId = typeof subscription.customer === 'string' ? subscription.customer : subscription.customer.id;
      // const entity = await userService.getUserEntityByPaymentId(customerId);
      // if (entity != null) {
      //   const localSubscription = await subscriptionService.getLocalSubscriptionByStripeSubscriptions(webEvent.data.object)
      //   await userService.updateUserEntity(entity.id, { subscriptionId: localSubscription?.id, st_subscriptionid });

      //   const auth = admin.auth();
      //   const userRecord = await auth.getUser(entity.id);
      //   // const appSubscription = (await admin.firestore().collection('/app-subscriptions').doc(webEvent.object.id/*WRONG*/).get()).data() as IUserPaymentMetadata;

      //   // get local subscription identifier
      //   const subscriptionId = null;
      //   await userService.updateUserClaims(userRecord, { subscriptionId })
      // }
    }
  }

}

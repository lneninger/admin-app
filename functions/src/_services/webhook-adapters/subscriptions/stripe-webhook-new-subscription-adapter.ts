import * as admin from 'firebase-admin';
import { Stripe } from 'stripe';

import { staticImplements } from '../../../functions.models';
import { IWebHookEvent } from '../../../stripe/web-hooks/stripe-webhook.models';
import { SubscriptionService } from '../../subscriptions/subscription.service';
import { UserService } from '../../users/user.service';
import { IStaticStripeWebhookAdapter } from '../abstract-stripe-webhook-adapter';
import { IStripeWebhookAdapter } from '../istripe-webhook-adapter';

@staticImplements<IStaticStripeWebhookAdapter>()
export class StripeWebhookNewSubscriptionAdapter implements IStripeWebhookAdapter {

  static readonly eventType = 'customer.subscription.created';
  async process(webEvent: IWebHookEvent<Stripe.Subscription>): Promise<void> {
    if (StripeWebhookNewSubscriptionAdapter.eventType === webEvent.type) {
      const userService = new UserService();
      const subscriptionService = new SubscriptionService();
      const subscription = webEvent.data.object;
      const st_subscriptionid = subscription.id;
      const customerId = typeof subscription.customer === 'string' ? subscription.customer : subscription.customer.id;
      const entity = await userService.getUserEntityByPaymentId(customerId);
      if (entity != null) {
        const localSubscription = await subscriptionService.getLocalSubscriptionByStripeSubscriptions(webEvent.data.object)
        const subscriptionId = localSubscription?.id;
        await userService.updateUserEntity(entity.id, { subscriptionId, st_subscriptionid });

        const auth = admin.auth();
        const userRecord = await auth.getUser(entity.id);
        // const appSubscription = (await admin.firestore().collection('/app-subscriptions').doc(webEvent.object.id/*WRONG*/).get()).data() as IUserPaymentMetadata;

        // get local subscription identifier
        const subscriptionName = localSubscription?.data.name;
        await userService.updateUserClaims(userRecord, { subscriptionId, subscriptionName })
      }
    }
  }

}

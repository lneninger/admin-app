import * as admin from 'firebase-admin';
import { staticImplements } from '../../../functions.models';

import { IWebHookEvent, IWebHookEventBodySubscription } from '../../../stripe/web-hooks/stripe-webhook.models';
import { UserService } from '../../users/user.service';
import { IStaticStripeWebhookAdapter } from '../abstract-stripe-webhook-adapter';
import { IStripeWebhookAdapter } from '../istripe-webhook-adapter';

@staticImplements<IStaticStripeWebhookAdapter>()
export class StripeWebhookNewSubscriptionAdapter implements IStripeWebhookAdapter {

  static readonly eventType = 'customer.subscription.created';
  async process(webEvent: IWebHookEvent<IWebHookEventBodySubscription>): Promise<void> {
    if (StripeWebhookNewSubscriptionAdapter.eventType === webEvent.type) {
      const userService = new UserService();

      const subscription = webEvent.data.object;
      const st_subscriptionid = subscription.id;
      const customerId = subscription.customer;
      const entity = await userService.getUserEntityByPaymentId(customerId);
      if (entity != null) {
        await userService.updateUserEntity(entity.userId, { st_subscriptionid });

        const auth = admin.auth();
        const userRecord = await auth.getUser(entity.userId);
        // const appSubscription = (await admin.firestore().collection('/app-subscriptions').doc(webEvent.object.id/*WRONG*/).get()).data() as IUserPaymentMetadata;

        // get local subscription identifier
        const subscriptionId = null;
        await userService.updateUserClaims(userRecord, { subscriptionId })
      }
    }
  }

}

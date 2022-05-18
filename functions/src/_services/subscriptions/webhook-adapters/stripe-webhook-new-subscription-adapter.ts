import * as admin from 'firebase-admin';
import { UserService } from '../../users/user.service';
import { IStripeWebhookAdapter } from '../../webhook-adapters/istripe-webhook-adapter';

export class StripeWebhookNewSubscriptionAdapter implements IStripeWebhookAdapter {
  async process(webEvent: any): Promise<void> {
    const userService = new UserService();
    if (webEvent.object.object === 'customer.subscription') {

      const st_subscriptionid = webEvent.object.id;
      const customerId = webEvent.object.customer;
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

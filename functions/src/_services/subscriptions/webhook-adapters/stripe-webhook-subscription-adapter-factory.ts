import { IWebHookEvent, IWebHookEventBodySubscription } from '../../../stripe/web-hooks/stripe-webhook.models';
import { IStripeWebhookAdapter } from '../../webhook-adapters/istripe-webhook-adapter';
import { StripeWebhookNewSubscriptionAdapter } from './stripe-webhook-new-subscription-adapter';


export class StripeWebhookSubscriptionAdapterFactory {
  static create(object: any): IStripeWebhookAdapter | undefined {
    const obj = object as IWebHookEvent<IWebHookEventBodySubscription>
    if (obj.object.object === 'subscription') {
      return new StripeWebhookNewSubscriptionAdapter();
    }

    return undefined;
  }
}

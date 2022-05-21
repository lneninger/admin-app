import { Type } from '../../../functions.models';
import { IStripeWebhookAdapter } from '../istripe-webhook-adapter';
import { AbstractStripeWebhookAdapterFactory } from '../stripe-webhook-adapter-factory';
import { StripeWebhookNewSubscriptionAdapter } from './stripe-webhook-new-subscription-adapter';

export class StripeWebhookSubscriptionAdapterFactory extends AbstractStripeWebhookAdapterFactory {
  readonly adapters: Type<IStripeWebhookAdapter>[] = [
    StripeWebhookNewSubscriptionAdapter
  ];
}

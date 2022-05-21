import { IStripeWebhookAdapter } from './istripe-webhook-adapter';


export interface IStaticStripeWebhookAdapter {
  new():IStripeWebhookAdapter;
  readonly eventType: string;
}



import { IStripeWebhookAdapter } from './istripe-webhook-adapter';


export interface IStripeWebhookAdapterFactory{
  create(object: any): IStripeWebhookAdapter;
}



export interface IStripeWebhookAdapter{
  process(object: any): void;
}

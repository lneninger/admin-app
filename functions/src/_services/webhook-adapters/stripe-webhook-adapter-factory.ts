import { IStripeWebhookAdapterFactory } from './istripe-webhook-adapter-factory';

export class StripeWebhookAdapterFactory {
  private static stripeWebhookAdapterFactories: IStripeWebhookAdapterFactory[] = [];
  static create(object: any) {
    for (const validator of this.stripeWebhookAdapterFactories) {
      const adapter = validator.create(object);
      if (adapter) {
        return adapter;
      }
    }
  }
}

import { Type } from '../../functions.models';
import { IWebHookEvent, IWebHookEventBodySubscription } from '../../stripe/web-hooks/stripe-webhook.models';
import { IStaticStripeWebhookAdapter } from './abstract-stripe-webhook-adapter';
import { IStripeWebhookAdapter } from './istripe-webhook-adapter';

export abstract class AbstractStripeWebhookAdapterFactory {
  abstract readonly adapters: Type<IStripeWebhookAdapter>[];

  create(webEvent: IWebHookEvent<IWebHookEventBodySubscription>): IStripeWebhookAdapter | undefined {
    const adapter = this.adapters.find(item => webEvent.type === (item as IStaticStripeWebhookAdapter).eventType)
    if (adapter) {
      return new adapter();
    }

    return undefined;
  }
}

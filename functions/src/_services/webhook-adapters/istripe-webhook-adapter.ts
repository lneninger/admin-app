import { IWebHookEvent, IWebHookEventBody } from '../../stripe/web-hooks/stripe-webhook.models';


export type IStripeWebhookAdapterClass = typeof AbstractStripeWebhookAdapter;

export abstract class AbstractStripeWebhookAdapter implements IStripeWebhookAdapter{
  abstract process(object: IWebHookEvent<IWebHookEventBody>): void;
}

export interface IStripeWebhookAdapter{
  process(webEvent: IWebHookEventBody): void;
}

import * as functions from 'firebase-functions';

import {
  StripeWebhookSubscriptionAdapterFactory,
} from '../_services/webhook-adapters/subscriptions/stripe-webhook-subscriptions-adapter-factory';
import { IConfig } from '../functions.models';
import { IWebHookEvent, IWebHookEventBodySubscription } from './web-hooks/stripe-webhook.models';


export const subscriptionListener = functions.pubsub.topic((functions.config() as IConfig).pubsub['stripe-subscription']).onPublish(async (message) => {

  const webEvent = message.json as IWebHookEvent<IWebHookEventBodySubscription>;
  const adapter = new StripeWebhookSubscriptionAdapterFactory().create(webEvent);
  if (adapter) {
    adapter?.process(webEvent);
  }
});




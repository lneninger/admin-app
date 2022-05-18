import * as functions from 'firebase-functions';

import { IConfig } from '../functions.models';
import { StripeWebhookAdapterFactory } from './../_services/webhook-adapters/stripe-webhook-adapter-factory';
import { IWebHookEvent, IWebHookEventBodySubscription } from './web-hooks/stripe-webhook.models';

export const subscriptionListener = functions.pubsub.topic((functions.config() as IConfig).pubsub['stripe-subscription']).onPublish(async (message) => {

  const webEvent = message.json as IWebHookEvent<IWebHookEventBodySubscription>;
  const adapter = StripeWebhookAdapterFactory.create(webEvent);
  if(adapter){
  adapter?.process(webEvent);
  }



});




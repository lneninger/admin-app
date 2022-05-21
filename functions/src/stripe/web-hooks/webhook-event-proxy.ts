import * as pubsub from '@google-cloud/pubsub';
import * as functions from 'firebase-functions';
import { IConfig } from '../../functions.models';
import { IWebHookEvent, IWebHookEventBody } from './stripe-webhook.models';


// Creates a client; cache this for further use
const pubSubClient = new pubsub.PubSub();

export const webhookEventProxy = functions.firestore.document('stripe-webhooks/{docId}').onCreate(async (snapshot) => {

  const webHookEvent = snapshot.data() as IWebHookEvent<IWebHookEventBody>;
  let messageId: string;
  switch (true) {
    case webHookEvent.type.includes('subscription'):
      messageId = await pubSubClient
        .topic((functions.config() as IConfig).pubsub['stripe-subscription'])
        .publishMessage({ json: webHookEvent });
      break;

    default: {
      messageId = null as unknown as string;
    }
      break;
  }

  return messageId;
});

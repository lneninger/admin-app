import * as pubsub from '@google-cloud/pubsub';
import * as functions from 'firebase-functions';
import { IWebHookEvent } from './stripe-webhook.models';


// Creates a client; cache this for further use
const pubSubClient = new pubsub.PubSub();

export const webhookEventProxy = functions.firestore.document('stripe-webhook').onCreate(async (snapshot, context) => {

  const webHookEvent = snapshot.data() as IWebHookEvent;
  let messageId: string;
  switch (webHookEvent.object) {
    case 'customer.subscription.updated':
    case 'customer.subscription.created': {
      messageId = await pubSubClient
        .topic('subscription')
        .publishMessage({ json: webHookEvent });
    }
      break;

    default: {
      messageId = null as unknown as string;
    }
      break;
  }

  return messageId;
});

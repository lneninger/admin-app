import { IWebHookEvent, IWebHookEventBodySubscription } from './web-hooks/stripe-webhook.models';
import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';

import { getUserEntityByPaymentId, updateUserClaims, updateUserEntity } from '../user/utils';

export const subscriptionListener = functions.pubsub.topic('subscription').onPublish(async (message) => {

  const webEvent = message.json as IWebHookEvent<IWebHookEventBodySubscription>;

  if(webEvent.object.object === 'customer.subscription'){
    const subscriptionId = webEvent.object.id;
    const customerId = webEvent.object.customer;
    const entity = await getUserEntityByPaymentId(customerId);
    if(entity != null){
    updateUserEntity(entity.userId, { subscriptionId });

    const auth = admin.auth();
    const userRecord = await auth.getUser(entity.userId);
    // get local subscription identifier
    const subscription = null;
    updateUserClaims(userRecord, { subscriptionId, subscription })
  }
}


});




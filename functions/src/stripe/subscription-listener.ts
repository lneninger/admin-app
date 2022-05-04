import { IWebHookEvent, IWebHookEventBodySubscription } from './web-hooks/stripe-webhook.models';
import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';

import { getUserEntityByPaymentId, updateUserClaims, updateUserEntity } from '../user/utils';
import { IConfig } from '../functions.models';

export const subscriptionListener = functions.pubsub.topic((functions.config() as IConfig).pubsub['stripe-subscription']).onPublish(async (message) => {

  const webEvent = message.json as IWebHookEvent<IWebHookEventBodySubscription>;

  if(webEvent.object.object === 'customer.subscription'){
    const st_subscriptionid = webEvent.object.id;
    const customerId = webEvent.object.customer;
    const entity = await getUserEntityByPaymentId(customerId);
    if(entity != null){
    updateUserEntity(entity.userId, { st_subscriptionid });

    const auth = admin.auth();
    const userRecord = await auth.getUser(entity.userId);
    // const appSubscription = (await admin.firestore().collection('/app-subscriptions').doc(webEvent.object.id/*WRONG*/).get()).data() as IUserPaymentMetadata;

    // get local subscription identifier
    const subscriptionId = null;
    updateUserClaims(userRecord, { subscriptionId })
  }
}


});




import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';
import { Stripe } from 'stripe';

import { IConfig } from './../functions.models';
import { ISubscriptionItem } from './customer-attach-subscription.models';


const stripe = new Stripe(functions.config().stripe.secretkey, { apiVersion: (functions.config() as IConfig).stripe.apiversion });

export const customerAttachSubscription = functions.firestore.document('app-subscriptions/{id}').onWrite(async (change, context) => {

  const id = context.params.id;
  const before = change.before.data() as ISubscriptionItem;
  const after = change.after.data() as ISubscriptionItem;

  switch (context.eventType) {
    case 'create':
      {
        const product = await createProduct(after);
        const price = await createPrice(product.id, after);
        admin.firestore().doc(`app-subscriptions/${id}`).update({ st_prodid: product.id, st_priceid: price.id });
      }
      break;
    case 'update':
      {
        let product = undefined as unknown as Stripe.Product;
        let price = undefined as unknown as Stripe.Price;

        let update = false;
        if (after.st_prodid) {
          product = await updateProduct(after.st_prodid, after);
        } else{
          update = true;
          product = await createProduct(after);
        }

        if (!after.st_priceid) {
          update = true;
          price = await createPrice(after.st_prodid || product?.id, after);
        }

        if (update) {
          admin.firestore().doc(`app-subscriptions/${id}`).update({
            st_prodid: after.st_prodid || product?.id,
            st_priceid: after.st_priceid || price?.id,
           });
        }

      }
      break;
    case 'delete':
      if (before.st_prodid) {
        await stripe.products.del(
          before.st_prodid
        );
      }
      break;
  }

});


async function createProduct(subscription: ISubscriptionItem) {
  return await stripe.products.create({
    name: subscription.name,
    active: true,
    description: subscription.description
  });
}

async function updateProduct(id: string, subscription: ISubscriptionItem) {
  return await stripe.products.update(id, {
    name: subscription.name,
    active: true,
    description: subscription.description
  });
}


async function createPrice(productId: string, subscription: ISubscriptionItem) {
  return await stripe.prices.create({
    unit_amount: subscription.price,
    currency: 'usd',
    product: productId
  });
}

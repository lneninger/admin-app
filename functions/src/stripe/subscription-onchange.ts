import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';
import { Stripe } from 'stripe';

import { IConfig } from './../functions.models';
import { ISubscriptionItem } from './customer-attach-subscription.models';


const stripe = new Stripe(functions.config().stripe.secretkey, { apiVersion: (functions.config() as IConfig).stripe.apiversion });

export const subscriptionOnchange = functions.firestore.document('app-subscriptions/{id}').onWrite(async (change, context) => {

  const id = context.params.id;
  const before = change.before.data() as ISubscriptionItem;
  const after = change.after.data() as ISubscriptionItem;

  console.log('context.eventType => ', context.eventType);

  switch (true) {
    case !change.before.exists:
      {
        // create
        const product = await createProduct(after);
        const price = await createPrice(product.id, after);
        admin.firestore().doc(`app-subscriptions/${id}`).update({ st_prodid: product.id, st_priceid: price.id });
      }
      break;
    case change.before.exists && change.after.exists:
      {
        let product: Stripe.Product | undefined;
        let price: Stripe.Price | undefined;

        let update = false;
        if (after.st_prodid) {
          product = await updateProduct(after.st_prodid, after);
        } else {
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
    case !change.after.exists:
      if (before.st_prodid) {
        await stripe.products.del(
          before.st_prodid
        );
      }
      break;
  }

  return Promise.resolve(true);

});


async function createProduct(subscription: ISubscriptionItem) {

  const exists: Stripe.Product[] = await (stripe.products as unknown as any).search({
    query: 'active:\'true\' AND name:\'' + subscription.name + '\'',
  });

  if (exists.length) {
    return exists[0];
  } else {
    return stripe.products.create({
      name: subscription.name,
      active: true,
      description: subscription.description,
      metadata: {
        type: 'subscription'
      }
    });
  }
}

async function updateProduct(id: string, subscription: ISubscriptionItem) {
  return stripe.products.update(id, {
    name: subscription.name,
    active: true,
    description: subscription.description
  });
}


async function createPrice(productId: string, subscription: ISubscriptionItem) {
  return stripe.prices.create({
    unit_amount: subscription.price * 100,
    currency: 'usd',
    product: productId,
    billing_scheme: 'per_unit',
    recurring: {
      interval: 'month'
    }
  });
}

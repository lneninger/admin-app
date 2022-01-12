import { IConfig } from '../functions.models';
import * as functions from 'firebase-functions';
import { Stripe } from 'stripe';
import { IProduct } from './payment.models';


const stripe = new Stripe(functions.config().stripe.secretKey, { apiVersion: (functions.config() as IConfig).stripe.apiversion });

export const productTrack = functions.firestore.document('app-products/{productId}').onWrite(async (change, context) => {
  const productId = context.params.productId;

  let stripeProduct: Stripe.ProductCreateParams;
  const dbProduct = (change.after.exists ? change.after.data() : change.before.data()) as IProduct;

  if (!change.before.exists) {
    stripeProduct = {
      id: productId,
      name: dbProduct.name,
      active: dbProduct.active,
      description: dbProduct.description,
      shippable: dbProduct.shippable,
      metadata: {},
    } as Stripe.ProductCreateParams;

    const response = await stripe.products.create(stripeProduct);

    const price = await stripe.prices.create({
      unit_amount: (dbProduct.price && dbProduct.price*100) || 2000,
      currency: 'usd',
      recurring: {interval: 'month'},
      product: productId,
    });

    console.log('Product creation response', response, price);
  } else if (!change.after.exists) {
    const response = await stripe.products.del(productId);
    console.log('Product deletion response', response);
  } else {
    const stripeProductUpdate = {
      id: productId,
      name: dbProduct.name,
      active: dbProduct.active,
      description: dbProduct.description,
      shippable: dbProduct.shippable,
      metadata: {},
    } as Stripe.ProductUpdateParams;
    const response = await stripe.products.update(productId, stripeProductUpdate)

    const price = await stripe.prices.create({
      unit_amount: (dbProduct.price && dbProduct.price*100) || 2000,
      currency: 'usd',
      recurring: {interval: 'month'},
      product: productId,
    });

    console.log('Product updating response', response, price);
  }
});

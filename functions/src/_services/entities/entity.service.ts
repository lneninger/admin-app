import * as functions from 'firebase-functions';
import { Stripe } from 'stripe';

import { IConfig } from '../../functions.models';

const stripe = new Stripe(functions.config().stripe.secretkey, { apiVersion: (functions.config() as IConfig).stripe.apiversion });

export class EntityService{
}

import { DocumentData } from '@angular/fire/firestore/firebase';
import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';
import { Stripe } from 'stripe';

import { IUserPaymentMetadata } from '../../../../src/app/main/services/user/user.models';
import { FirestoreDocumentMapping, IConfig } from '../../functions.models';
import { ISubscriptionGetByUserRequest } from '../../stripe/subscription-get-by-user/subscription-get-by-user.models';

const stripe = new Stripe(functions.config().stripe.secretkey, { apiVersion: (functions.config() as IConfig).stripe.apiversion });

export class EntityService{
}

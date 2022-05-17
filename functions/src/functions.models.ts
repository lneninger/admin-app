import * as admin from 'firebase-admin';
import { Firestore } from '@angular/fire/firestore';

export interface IConfig {
  environment: {
    apptitle: string;
    production: boolean;
    referer: string | string[];
  },
  gmail: {
    password: string;
    email: string;
  },
  stripe: {
    apiversion: '2020-08-27',
    publickey: string;
    secretkey: string;
    webhookdomain: string;
  },
  plaid: {
    clientid: string;
    secret: string;
    publickey: string;
    environment: string;
  },
  pubsub: {
    'stripe-subscription': 'firebase-adminsys-20210823'
  }

}


export interface FirestoreDocumentMapping<T>{
  id: string;
  data: T;
  $original: admin.firestore.DocumentData
}

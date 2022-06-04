import * as admin from 'firebase-admin';

/**
 * Class type mapping copy from angular. Useful to create list of Class types
 */
export declare interface Type<T> extends Function {
  new(...args: any[]): T;
}

/* class decorator to specify static interface implementation */
export function staticImplements<T>() {
  return <U extends T>(constructor: U) => { constructor };
}

export interface ICustomMapping {
  [key: string]: unknown;
}

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
  azure: {
    clientid: string,
    tenantid: string,
    aadauthority: string,
    scope: string[] | string
  },
  pubsub: {
    'stripe-subscription': 'firebase-adminsys-20210823'
  }

}


export interface FirestoreDocumentMapping<T> {
  id: string;
  data: T;
  $original: admin.firestore.DocumentData
}

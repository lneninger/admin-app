import * as Cors from 'cors';
import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';
import { UserRecord } from 'firebase-functions/v1/auth';
import { Stripe } from 'stripe';

import { accessDomains } from '../config/access-domains';
import { logHttp } from '../site/log-wrapper-function';
import { updateUserClaims, updateUserEntity } from '../user/utils';
import { IConfig } from './../functions.models';
import { ICustomerInputModel } from './payment.models';

const cors = Cors({ origin: accessDomains });

const stripe = new Stripe(functions.config().stripe.secretkey, { apiVersion: (functions.config() as IConfig).stripe.apiversion });

export const customerCreate = functions.https.onRequest((req: functions.https.Request, res: functions.Response) => {

  return cors(req, res, async () => {

    return logHttp(req, res, 'customerCreate', async () => {

      const data = <ICustomerInputModel>req.body.data;
      console.log('Mapped to model', data, 'original body', req.body);

      const response = await customerCreateCore(data.userId);

      const result = { customer: response?.id };

      res.status(200).json();

      return result;

    });

  });

});



export async function customerCreateCore(createCustomerRequest: string | Stripe.CustomerCreateParams): Promise<Stripe.Customer> {
  console.log('Creating customer');
  const auth = admin.auth();
  let userRecord: UserRecord;

  if (typeof (createCustomerRequest) === 'string') {
    // user Id
    userRecord = await auth.getUser(createCustomerRequest);
    createCustomerRequest = {
      email: userRecord.email,
      name: userRecord.displayName
    } as Stripe.CustomerCreateParams;
  } else {
    userRecord = await auth.getUserByEmail(createCustomerRequest.email as string);
  }

  const userEntity = await admin.firestore().collection('/entities').doc(userRecord.uid).get();
  let customer: Stripe.Customer;
  if (!userEntity.exists || !userEntity.data()?.paymentId) {
    const customerListParams: Stripe.CustomerListParams = {
      email: createCustomerRequest.email
    };
    const existingCustomers = await stripe.customers.list(customerListParams);
    if (existingCustomers.data.length > 0) {
      // assume this customer as the correct customer and set the paymentid
      customer = existingCustomers.data[0];
    } else {
      customer = await stripe.customers.create(createCustomerRequest);
    }

    const paymentId = customer.id;
    updateUserEntity(userRecord.uid, { paymentId })
    updateUserClaims(userRecord, { paymentId })

  } else {
    customer = await stripe.customers.retrieve(userEntity.data()?.paymentId) as unknown as Stripe.Customer;
  }

  return customer;
}





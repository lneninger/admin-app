import * as admin from 'firebase-admin';
import * as Cors from 'cors';
import * as functions from 'firebase-functions';
import { Configuration, PlaidApi, PlaidEnvironments } from 'plaid';
import { Stripe } from 'stripe';

import { IConfig } from '../functions.models';
import { logHttp } from '../site/log-wrapper-function';
import { IPlaidStripeInputModel } from './payment.models';

const cors = Cors({ origin: true });
const stripe = new Stripe(functions.config().stripe.secretkey, { apiVersion: (functions.config() as IConfig).stripe.apiversion });


export const attachBankAccount = functions.https.onRequest((req: functions.https.Request, res: functions.Response) => {

  return cors(req, res, async () => {

    return logHttp(req, res, 'plaidToken', async () => {

      const data = <IPlaidStripeInputModel>req.body.data;

      console.log('Mapped to model', data, 'original body', req.body);


      const configuration = new Configuration({
        basePath: PlaidEnvironments.sandbox,
        baseOptions: {
          headers: {
            'PLAID-CLIENT-ID': (functions.config() as IConfig).plaid.clientid,
            'PLAID-SECRET': (functions.config() as IConfig).plaid.secret,
          },
        },
      });
      console.log('Plaid configured and ready to create the client');

      const client = new PlaidApi(configuration);
      console.log('Plaid client created');

      try {
        // create public token
        const accessTokenResponse = await client.itemPublicTokenExchange({
          public_token: data.publicToken
        });
        console.log('accessTokenResponse', accessTokenResponse);

        // create stripe bank account token
        const stripeBankAccountTokenResponse = await client.processorStripeBankAccountTokenCreate({
          access_token: accessTokenResponse.data.access_token,
          account_id: data.accountId
        });
        console.log('stripeBankAccountTokenResponse', stripeBankAccountTokenResponse);

        // attach token to customer
        if (data.customerId) {
          const entityData = (await admin.firestore().collection('/entities').doc(data.customerId).get()).data();
          if (entityData) {
            const response = await stripe.customers.createSource(entityData.paymentId, { source: stripeBankAccountTokenResponse.data.stripe_bank_account_token });
            res.status(200).jsonp({status: 'success'});
            console.log(response, response);
          } else {
            res.status(200).jsonp({ message: 'Source created but cannot attach it to any customer. Customer has not associated stripe record' });

          }
        }
        res.status(200).jsonp({ bankAccountToken: stripeBankAccountTokenResponse.data.stripe_bank_account_token });
      } catch (error) {
        res.status(500).jsonp(error);
      }
    });
  });

});

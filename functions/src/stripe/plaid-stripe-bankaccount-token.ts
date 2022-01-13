import * as Cors from 'cors';
import * as functions from 'firebase-functions';
import { Configuration, PlaidApi, PlaidEnvironments } from 'plaid';
import { Stripe } from 'stripe';

import { IConfig } from '../functions.models';
import { logHttp } from '../site/log-wrapper-function';
import { IPlaidStripeInputModel } from './payment.models';

const cors = Cors({ origin: true });
const stripe = new Stripe(functions.config().stripe.secretKey, { apiVersion: (functions.config() as IConfig).stripe.apiversion });


export const attackBankAccount = functions.https.onRequest((req: functions.https.Request, res: functions.Response) => {

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

      const client = new PlaidApi(configuration);

      try {
        // create public token
        const accessTokenResponse = await client.itemPublicTokenExchange({
          public_token: data.publicToken
        });

        // create stripe bank account token
        const stripeBankAccountTokenResponse = await client.processorStripeBankAccountTokenCreate({
          access_token: accessTokenResponse.data.access_token,
          account_id: data.accountId
        });

        // attack token to customer
        if (data.customerId) {
          const response = await stripe.customers.createSource(data.customerId, { source: stripeBankAccountTokenResponse.data.stripe_bank_account_token });
          res.status(200).jsonp(response);
        }
        res.status(200).jsonp({ bankAccountToken: stripeBankAccountTokenResponse.data.stripe_bank_account_token });
      } catch (error) {
        res.status(500).jsonp(error);
      }
    });
  });

});

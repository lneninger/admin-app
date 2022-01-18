import * as admin from 'firebase-admin';
import * as Cors from 'cors';
import * as functions from 'firebase-functions';
import { Configuration, PlaidApi, PlaidEnvironments } from 'plaid';
import { Stripe } from 'stripe';

import { IConfig } from '../functions.models';
import { logHttp } from '../site/log-wrapper-function';
import { IPlaidStripeInputModel } from './payment.models';
import { response } from 'express';

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

        let response: any;
        // attach token to customer
        if (data.userId) {
          const entityData = (await admin.firestore().collection('/entities').doc(data.userId).get()).data();
          if (entityData) {
            const createSourceRsponse = await stripe.customers.createSource(entityData.paymentId, { source: stripeBankAccountTokenResponse.data.stripe_bank_account_token });
            response = { status: 'success', bankAccount: createSourceRsponse.lastResponse };
            res.status(200).jsonp(response);
            console.log(response, response);
          } else {
            response = { message: 'Source created but cannot attach it to any customer. Customer has not associated stripe record' };
            res.status(200).jsonp(response);
          }
        } else {
          response = { bankAccountToken: stripeBankAccountTokenResponse.data.stripe_bank_account_token };
          res.status(200).jsonp(response);
        }
      } catch (error) {
        res.status(500).jsonp(error);
        throw error;
      }


      return response;

    });

  });

});

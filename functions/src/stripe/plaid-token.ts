import * as Cors from 'cors';
import * as functions from 'firebase-functions';
import { Configuration, CountryCode, PlaidApi, PlaidEnvironments, Products } from 'plaid';
import { IConfig } from '../functions.models';
import { logHttp } from '../site/log-wrapper-function';
import { IPlaidTokenInputModel } from './payment.models';

const cors = Cors({ origin: true });


export const plaidToken = functions.https.onRequest((req: functions.https.Request, res: functions.Response) => {

  return cors(req, res, async () => {

    return logHttp(req, res, 'plaidToken', async () => {

      const data = <IPlaidTokenInputModel>req.body.data;

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
        const tokenResponse = await client.linkTokenCreate({
          client_name: data.appName,
          language: 'EN',
          products: [Products.Auth],
          webhook: 'https://sample.webhook.com',
          country_codes: [CountryCode.Us],
          user: {
            client_user_id: data.stripeCustomerId
          }
        });
        res.status(200).jsonp({ linkToken: tokenResponse.data.link_token });
      } catch (error) {
        res.status(500).jsonp(error);
      }
    });
  });

});

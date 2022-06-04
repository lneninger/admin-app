import { AccessToken, GetTokenOptions } from '@azure/core-auth';
import * as msal from '@azure/msal-node';
import axios from 'axios'


export class AzureService {

  constructor(private clientId: string, private tenantId: string, private aadAuthority: string) { }

  async getGoogleIDToken(): Promise<any> {

    const headers = {
      'Metadata-Flavor': 'Google '
    };


    const aadAudience = 'api://AzureADTokenExchange';

    const endpoint = 'http://metadata.google.internal/computeMetadata/v1/instance/service-accounts/default/identity?audience=' + aadAudience;

    const options = {
      headers: headers,
    };

    return axios.get(endpoint, options);
  }

  async getToken(scope: string | string[], _options?: GetTokenOptions): Promise<AccessToken> {

    let scopes: string[] = [];

    if (typeof scope === 'string') {
      scopes[0] = scope;
    } else if (Array.isArray(scope)) {
      scopes = scope;
    }

    // Get the ID token from Google.
    const clientAssertion = await this.getGoogleIDToken(); // calling this directly just for clarity,
    // this should be a callback
    // pass this as a client assertion to the confidential client app
    const msalApp = new msal.ConfidentialClientApplication({
      auth: {
        clientId: this.clientId,
        authority: this.aadAuthority + this.tenantId,
        clientAssertion: clientAssertion,
      }
    });
    const aadToken = await msalApp.acquireTokenByClientCredential({ scopes });


    // return in form expected by TokenCredential.getToken
    const result = {
      token: (<string>aadToken?.accessToken),
      expiresOnTimestamp: (<number>aadToken?.expiresOn?.getTime()),
    };

    return result;
  }
}

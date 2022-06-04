import * as Cors from 'cors';
import * as functions from 'firebase-functions';

import { accessDomains } from '../config/access-domains';
import { IConfig } from '../functions.models';
import { logHttp } from '../site/log-wrapper-function';
import { AzureService } from './../_services/azure/azure.service';


const clientId = (functions.config() as IConfig).azure.clientid;
const tenantId = (functions.config() as IConfig).azure.tenantid;
const aadAuthority = (functions.config() as IConfig).azure.aadauthority;
const scope = (functions.config() as IConfig).azure.scope;
const cors = Cors({ origin: accessDomains });

export const azureGetProfile = functions.https.onRequest((req: functions.https.Request, res: functions.Response) => {

  return cors(req, res, async () => {

    return logHttp(req, res, 'azureGetProfile', async () => {
      try {
        const azureService = new AzureService(clientId, tenantId, aadAuthority);
        const token = await azureService.getToken(scope);

        res.status(200).json({ token });
        return token;
      }
      catch (error) {
        res.status(400).json(error);
        return null;
      }
    });

  });
});

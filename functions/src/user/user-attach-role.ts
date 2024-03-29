import * as functions from 'firebase-functions';
import * as Cors from 'cors';
import { IAttachRole } from './user.models';
import { attachRoleCore } from './user-attach-role-utils';
import { accessDomains } from '../config/access-domains';

const cors = Cors({ origin: accessDomains });


export const attachRole = functions.https.onRequest((req: functions.https.Request, res: functions.Response) => {

  return cors(req, res, async () => {

    const data = <IAttachRole>req.body.data;

    const result = await attachRoleCore(data);

    res.status(200).json(result);

  });

});




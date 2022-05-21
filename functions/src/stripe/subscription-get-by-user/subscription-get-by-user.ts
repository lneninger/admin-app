import * as Cors from 'cors';
import * as functions from 'firebase-functions';

import { SubscriptionService } from '../../_services/subscriptions/subscription.service';
import { accessDomains } from '../../config/access-domains';
import { logHttp } from '../../site/log-wrapper-function';
import { ISubscriptionGetByUserRequest } from './subscription-get-by-user.models';

const cors = Cors({ origin: accessDomains });

export const subscriptionGetByUser = functions.https.onRequest((req: functions.https.Request, res: functions.Response) => {

  return cors(req, res, async () => {

    return logHttp(req, res, 'subscriptionGetByUser', async () => {

      const data = <ISubscriptionGetByUserRequest>req.body.data;

      const subscriptionService = new SubscriptionService();

      try {
        const localSubscription = await subscriptionService.subscriptionGetByUserCore(data);
        if (localSubscription) {
          res.status(200).json({ data: localSubscription });
          return localSubscription;
        } else {
          res.status(204).json({});
          return null;
        }
      } catch (error) {
        res.status(400).json(error);
        return null;
      }
    });

  });

});




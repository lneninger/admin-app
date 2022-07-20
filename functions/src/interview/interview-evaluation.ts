import * as Cors from 'cors';
import * as functions from 'firebase-functions';
import { Configuration, CountryCode, PlaidApi, PlaidEnvironments, Products } from 'plaid';
import { accessDomains } from '../config/access-domains';
import { IConfig } from '../functions.models';
import { logHttp } from '../site/log-wrapper-function';
import { InterviewService } from '../_services/interviews/interview.service';
import { IInterviewEvaluationRequest } from './interview-models';

const cors = Cors({ origin: accessDomains });
export const interviewEvaluation = functions.https.onRequest((req: functions.https.Request, res: functions.Response) => {

  return cors(req, res, async () => {

    return logHttp(req, res, 'plaidToken', async () => {

      const data = <IInterviewEvaluationRequest>req.body.data;

      console.log('Mapped to model', data, 'original body', req.body);

      try {
        const service = new InterviewService();
        const result = service.evaluate();
        res.status(200).jsonp({ result });
        return result;
      } catch (error) {
        res.status(500).jsonp(error);
        return error;
      }
    });
  });

});

import * as Cors from 'cors';
import * as functions from 'firebase-functions';
import { accessDomains } from '../config/access-domains';
import { logHttp } from '../site/log-wrapper-function';
import { IInterviewEvaluateRequest } from '../_services/interviews/interview.models';
import { InterviewService } from '../_services/interviews/interview.service';

const cors = Cors({ origin: true/*accessDomains*/ });
export const interviewEvaluation = functions.https.onRequest((req: functions.https.Request, res: functions.Response) => {

  return cors(req, res, async () => {

    return logHttp(req, res, 'interviewEvaluation', async () => {

      const data = <IInterviewEvaluateRequest>req.body;

      console.log('Mapped to model', data, 'original body', req.body);

      try {
        const service = new InterviewService();
        const result = service.evaluate(data);
        res.status(200).jsonp({ result });
        return result;
      } catch (error) {
        res.status(500).jsonp(error);
        return error;
      }
    });
  });

});

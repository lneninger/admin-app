// netstat -a -n -o | find "7099"
// taskkill /F /PID pid_number

import { test } from '@jest/globals';

// import * as firebase from '@firebase/testing';
import * as admin from 'firebase-admin';

import { initializeInterviews } from './../../src/_mocker/mocker-interviews';
import { IInterviewEvaluationRequest, InterviewEvaluationAction } from '../../src/_services/interviews/interview.models';
import { InterviewService } from '../../src/_services/interviews/interview.service';

const projectId = 'firebase-adminsys-20210823';
process.env.GCLOUD_PROJECT = projectId;
process.env.FIRESTORE_EMULATOR_HOST = 'localhost:7099';
const app = admin.initializeApp({ projectId });


admin.firestore(app);
beforeAll(() => {
  return initializeInterviews();
});


test('logstore', async () => {

  const data = <IInterviewEvaluationRequest>{
    id: 'vitae1',
    action: InterviewEvaluationAction.Initialize,
    pageInfo: undefined,
    value: undefined
  };


  const service = new InterviewService();
  const result = await service.evaluate(data);

  expect(result).toBeTruthy();
});

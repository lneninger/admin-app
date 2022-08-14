import { test } from '@jest/globals';
import { IInterviewEvaluationRequest, InterviewEvaluationAction } from '../../src/_services/interviews/interview.models';
import { InterviewService } from '../../src/_services/interviews/interview.service';

import * as firebase from 'firebase/app';
import * as admin from 'firebase-admin';

firebase.initializeApp({
  // name: 'firebase-adminsys-20210823',
  apiKey: 'AIzaSyBVX_mxqJJZO6gDvUJDER1jA8BL5xr6qcc',
});
// const testEnv = Test();

test('logstore', () => {
  admin.initializeApp();

  const data = <IInterviewEvaluationRequest>{
    id: 'vitae1',
    action: InterviewEvaluationAction.Initialize,
    pageInfo: undefined,
    value: undefined
  };


  const service = new InterviewService();
  const result = service.evaluate(data);

  expect(result).toBeTruthy();
});

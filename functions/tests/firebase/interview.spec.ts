// netstat -a -n -o | find "7099"
// taskkill /F /PID pid_number

import { test } from '@jest/globals';

import * as admin from 'firebase-admin';

import { initializeInterviews } from './../../src/_mocker/mocker-interviews';
import { IInterviewEvaluateRequest, InterviewEvaluationAction } from '../../src/_services/interviews/interview.models';
import { InterviewService } from '../../src/_services/interviews/interview.service';

const projectId = 'firebase-adminsys-20210823';
process.env.GCLOUD_PROJECT = projectId;
process.env.FIRESTORE_EMULATOR_HOST = 'localhost:7099';
const app = admin.initializeApp({ projectId });
admin.firestore().settings({ignoreUndefinedProperties:true});


admin.firestore(app);
beforeEach(() => {
  return initializeInterviews();
});

afterEach(async () => {
  const firestore = admin.firestore();
  const deleteTasks: Promise<void>[] = [];
  (await firestore.listCollections()).forEach(colRef => {
    deleteTasks.push(firestore.recursiveDelete(colRef));
  });

  await Promise.all(deleteTasks);
});


test('new initialize application not throws exceptions', async () => {

  const data = <IInterviewEvaluateRequest>{
    type: 'vitae1',
    entityId: undefined,
    entityType: 'user',
    action: InterviewEvaluationAction.Initialize,
    pageInfo: undefined,
    value: undefined
  };


  const service = new InterviewService();
  const result = await service.evaluate(data);

  expect(result).toBeTruthy();
});

test('new initialize application must be saved', async () => {

  const data = <IInterviewEvaluateRequest>{
    type: 'vitae1',
    entityId: undefined,
    entityType: 'user',
    action: InterviewEvaluationAction.Initialize,
    pageInfo: undefined,
    value: undefined
  };


  const service = new InterviewService();
  const result = await service.evaluate(data);

  const firestore = admin.firestore();
  const interviewSize = (await firestore.collection('app-interview-executions').get()).size;

  expect(result).toBeTruthy();
  expect(interviewSize).toBe(1);

});

test('new initialize application must have maxVisitedCategory and maxVisitedPage', async () => {

  const data = <IInterviewEvaluateRequest>{
    type: 'vitae1',
    entityId: undefined,
    entityType: 'user',
    action: InterviewEvaluationAction.Initialize,
    pageInfo: undefined,
    value: undefined
  };


  const service = new InterviewService();
  const result = await service.evaluate(data);

  expect(result.maxVisitedCategory).toBeTruthy();
  expect(result.maxVisitedPage).toBeTruthy();

});

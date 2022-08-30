import { vitae1 } from './../../src/_mocker/mocker.models';
// netstat -a -n -o | find "7099"
// taskkill /F /PID pid_number


import * as admin from 'firebase-admin';

import { initializeInterviews } from './../../src/_mocker/mocker-interviews';
import { IInterviewEvaluateRequest, InterviewEvaluationAction } from '../../src/_services/interviews/interview.models';
import { InterviewService } from '../../src/_services/interviews/interview.service';

const projectId = 'firebase-adminsys-20210823';
process.env.GCLOUD_PROJECT = projectId;
process.env.FIRESTORE_EMULATOR_HOST = 'localhost:7099';
const app = admin.initializeApp({ projectId });
admin.firestore().settings({ ignoreUndefinedProperties: true });

beforeAll(() => {
  jasmine.DEFAULT_TIMEOUT_INTERVAL = 1000000;
});

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

describe('InterviewService', () => {
  it('new initialize application not throws exceptions', async () => {

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

    await expect(result).toBeTruthy();
  });

  it('new initialize application must be saved', async () => {

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

    await expect(result).toBeTruthy();
    await expect(interviewSize).toBe(1);

  });

  it('new initialize application must have maxVisitedCategory and maxVisitedPage', async () => {

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

    await expect(result.maxVisitedCategory).toBeTruthy();
    await expect(result.maxVisitedPage).toBeTruthy();

  });

  it('new initialize application must have maxVisitedCategory=1 and maxVisitedPage=1', async () => {

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

    await expect(result.maxVisitedCategory).toBe(vitae1.categories[0].name);
    await expect(result.maxVisitedPage).toBe(vitae1.categories[0].pages[0].name);

  });

  it('new initialize application must have fields', async () => {

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

    await expect(result.currentPageFields.length).toBeGreaterThan(1);
  });


  fit('new initialize application have validation error', async () => {

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
    const persistedDoc = (await firestore.collection('app-interview-executions').get()).docs[0];
    const mappedDoc = InterviewService.mapInterviewStatus(persistedDoc);

    console.info(`persisted interview => `, mappedDoc.data);

    await expect(mappedDoc).toBeTruthy();
    await expect(mappedDoc.data).toBeTruthy();
    await expect(mappedDoc.id).toBeTruthy();
    await expect(result.currentPageFields.some(field => field.evaluations.errors.length > 0)).toBeTruthy();
  });




})


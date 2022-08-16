import { Persistence, StateRepository } from '@angular-ru/ngxs/decorators';
import { NgxsDataRepository } from '@angular-ru/ngxs/repositories';
import { Injectable } from '@angular/core';
import { Selector, State, Store } from '@ngxs/store';
import { IInterviewEvaluateRequest } from 'functions/src/_services/interviews/interview.models';
import { IInterviewEvaluationResult } from 'functions/src/_services/interviews/models/interview-evaluation-result';
import { firstValueFrom } from 'rxjs';
import { FirebaseService } from 'src/app/shared/firebase/firebase.service';
import { InterviewEvaluationAction } from '../../../../../../../functions/src/_services/interviews/models/interview-evaluation-response';
import { IInterviewInstance } from '../models/interfaces/interface-interview-instance';
import { IInterviewActionPayload } from '../models/interview-action-payload';
import { IInterviewConfig } from '../models/interview.config';
import { InterviewInstance } from './../models/interview-instance';
import { IInterviewStateModel } from './interview-state.models';
import { vitae1 } from './moked-data';

@Persistence()
@StateRepository()
@State<IInterviewStateModel>({
  name: 'interviews',
  defaults: {
    interviewDefinitions: [vitae1],
    interviewInstances: []
  }
})
@Injectable()
export class InterviewService extends NgxsDataRepository<IInterviewStateModel> {

  @Selector()
  static interviewDefinitionsSelector(state: IInterviewStateModel) {
    return state.interviewDefinitions;
  }

  @Selector()
  static interviewInstancesSelector(state: IInterviewStateModel) {
    return state.interviewInstances;
  }

  constructor(private store: Store, private firebaseService: FirebaseService) {
    super();
  }

  ngxsAfterBootstrap() {
    console.trace('Interview Service bootstrapped!');
  }

  // @DataAction()
  // saveInterview(@Payload('action') action: ('ADD' | 'UPDATE'), @Payload('interview') interview: IPersistedInterviewStatus) {
  //   this.setState(
  //     action === 'UPDATE' ? patch({
  //       interviewInstances: updateItem<IPersistedInterviewStatus>(item => item.id === interview.id, interview)
  //     })
  //       : patch({
  //         interviewInstances: append([interview])
  //       })
  //   );
  // }

  initialize(config: IInterviewConfig): IInterviewInstance {

    const interview = new InterviewInstance({ id: config.id, config });
    const req: IInterviewEvaluateRequest = {
      type: config.id,
      action: InterviewEvaluationAction.Initialize,
    };

    this.evaluate(req, interview);

    return interview
  }



  async evaluate(req: IInterviewEvaluateRequest, interview: IInterviewInstance): Promise<void> {

    const formattedRequest = this.formatEvaluationRequest(req);
    const evaluationResult = await this.remoteEvaluation(formattedRequest);


    this.formatForm(interview, evaluationResult);
  }
  formatEvaluationRequest(req: IInterviewActionPayload): IInterviewEvaluateRequest {
    return {...req};
  }

  async remoteEvaluation(req: IInterviewEvaluateRequest){
      const fn = this.firebaseService.fns.httpsCallable('attachRole');
      return firstValueFrom(fn(req));
  }



  formatForm(interview: IInterviewInstance, evaluationResult: IInterviewEvaluationResult) {

    // clear form if page changed
    if (evaluationResult.targetPage !== interview.currentPage) {
      const controlNames = Object.getOwnPropertyNames(interview.formFields.form.controls);
      controlNames.forEach(controlName => interview.formFields.form.removeControl(controlName));
    }

    interview.currentPageFields.forEach((fieldItem, index) => {
      interview.formFields.formatFormField(fieldItem.name);
    });

  }







}

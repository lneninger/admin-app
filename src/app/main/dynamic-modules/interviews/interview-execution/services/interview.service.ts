import { Utilities } from './../../../../../shared/common/utilities';
import { IItemEvaluationResult } from './../evaluation/services/evaluator.models';
import { DataAction, Payload, Persistence, StateRepository } from '@angular-ru/ngxs/decorators';
import { NgxsDataRepository } from '@angular-ru/ngxs/repositories';
import { Injectable } from '@angular/core';
import { Selector, State, Store } from '@ngxs/store';
import { EvaluatorService } from '../evaluation/services/evaluator.service';
import { IInterviewEvaluateRequest, IInterviewFieldStatus, InterviewEvaluationAction, IPersistedInterviewFieldStatus, IPersistedInterviewStatus } from '../models/executing-interview';
import { IInterviewPagingResult } from '../models/interview-evaluation-result';
import { IInterviewConfig } from '../models/interview.config';
import { InterviewDefinition } from './../models/interview-definition';
import { IInterviewInstance, InterviewInstance } from './../models/interview-instance';
import { IInterviewStateModel } from './interview-state.models';
import { vitae1 } from './moked-data';
import { append, patch, updateItem } from '@ngxs/store/operators';
import { FirebaseService } from 'src/app/shared/firebase/firebase.service';
import { firstValueFrom } from 'rxjs';

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

  @DataAction()
  saveInterview(@Payload('action') action: ('ADD' | 'UPDATE'), @Payload('interview') interview: IPersistedInterviewStatus) {
    this.setState(
      action === 'UPDATE' ? patch({
        interviewInstances: updateItem<IPersistedInterviewStatus>(item => item.id === interview.id, interview)
      })
        : patch({
          interviewInstances: append([interview])
        })
    );
  }

  initialize(config: IInterviewConfig): IInterviewInstance {

    const interview = new InterviewInstance({ id: config.id, config });
    const req: IInterviewEvaluateRequest = {
      action: InterviewEvaluationAction.Initialize,
    };

    this.evaluate(req, interview);

    return interview
  }



  evaluate(req: IInterviewEvaluateRequest, interview: IInterviewInstance): void {




    this.formatForm(interview, pagingResult);
  }

  async remoteEvaluation(){
      const fn = this.firebaseService.fns.httpsCallable('attachRole');
      return firstValueFrom(fn({ uid: userId, role: roleName } as IEvaluationResult));
  }



  formatForm(interview: IInterviewInstance, evaluationResult: IInterviewPagingResult) {

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

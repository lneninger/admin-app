import { Persistence, StateRepository } from '@angular-ru/ngxs/decorators';
import { NgxsDataRepository } from '@angular-ru/ngxs/repositories';
import { Injectable } from '@angular/core';
import { Selector, State, Store } from '@ngxs/store';
import { Utilities } from 'src/app/main/services/utilities';
import { UtilitiesService } from 'src/app/shared/utilities.service';
import { IExecutingInterview, IInterviewEvaluateFieldResponse, IInterviewEvaluateRequest, IInterviewEvaluateResponse, InterviewEvaluationAction } from '../models/executing-interview';
import { IInterviewConfig } from '../models/interview.config';
import { IInterviewDefinition } from './../models/interview-definition';
import { IInterviewInstance } from './../models/interview-instance';
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
  config: IInterviewConfig;

  @Selector()
  static interviewDefinitionsSelector(state: IInterviewStateModel) {
    return state.interviewDefinitions;
  }

  @Selector()
  static interviewInstancesSelector(state: IInterviewStateModel) {
    return state.interviewInstances;
  }

  constructor(private store: Store) {
    super();
  }

  ngxsAfterBootstrap() {
    console.trace('Interview Service bootstrapped!');
  }

  initialize(config: IInterviewConfig) {

    this.config = config;
    const req: IInterviewEvaluateRequest = {
      id: this.config.id,
      action: InterviewEvaluationAction.Initialize,
    };

    return this.evaluate(req);
  }

  evaluate(req: IInterviewEvaluateRequest): IInterviewEvaluateResponse {
    const interviewDefinition = this.getInterviewDefinition(req.id);
    const interviewInstance = this.getInterviewInstance(req.id);

    const result: IInterviewEvaluateResponse = {
      id: req.id,
      currentCategory: interviewDefinition.categories[0].id,
      currentPage: interviewDefinition.categories[0].pages[0].id,
      values: !interviewInstance ? [] : Object.getOwnPropertyNames(interviewInstance.fieldValues).map(itemKey => ({ id: itemKey, value: interviewInstance.fieldValues[itemKey] } as IInterviewEvaluateFieldResponse)),
    };


    const fieldsEvaluation = this.fieldsEvaluation(interviewInstance?.fieldValues || [], interviewDefinition);

    if (req.action === InterviewEvaluationAction.Initialize) {
      result.categories = interviewDefinition.categories.map(item => {
        const result = Utilities.cloneHard({ ...item });
        // delete result['pages'];
        return result;
      });
    }


    // if (!result.status) {
    //   result.status = {
    //     currentCategory: result.categories[0].id,
    //     currentPage:
    //   } as IExecutingInterviewStatus;
    // }

    return result;
  }
  fieldsEvaluation(fieldValues: { [key: string]: any; }, interviewDefinition: IInterviewDefinition) {
    for (let category of interviewDefinition.categories) {
      if (category.pages) {
        for (let page of category.pages) {
          if (page.fields) {
            for (let field of page.fields) {

            }
          }
        }
      }
    }
  }

  getInterviewDefinition(id: string): IInterviewDefinition {
    return this.store.selectSnapshot(InterviewService.interviewDefinitionsSelector).find(item => item.id === id);
  }

  getInterviewInstance(id: string): IInterviewInstance {
    return this.store.selectSnapshot(InterviewService.interviewInstancesSelector).find(item => item.id === id);
  }

  getInterviewStatus(id: string): IExecutingInterview {
    return UtilitiesService.cloneHard(vitae1);
  }


}

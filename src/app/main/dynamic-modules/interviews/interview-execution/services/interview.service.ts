import { Persistence, StateRepository } from '@angular-ru/ngxs/decorators';
import { NgxsDataRepository } from '@angular-ru/ngxs/repositories';
import { Injectable } from '@angular/core';
import { Selector, State, Store } from '@ngxs/store';
import { IInterviewEvaluateRequest, IInterviewFieldStatus, InterviewEvaluationAction, IPersistedInterviewStatus } from '../models/executing-interview';
import { InterviewFieldsEvalutionResult } from '../models/interview-field';
import { IInterviewConfig } from '../models/interview.config';
import { IInterviewDefinition } from './../models/interview-definition';
import { IInterviewInstance, InterviewInstance } from './../models/interview-instance';
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

  constructor(private store: Store) {
    super();
  }

  ngxsAfterBootstrap() {
    console.trace('Interview Service bootstrapped!');
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


    const interviewDefinition = this.getInterviewDefinition(interview.id);
    const previousInterview = this.getInterviewInstance(interview.id);

    // const result: IInterviewEvaluateResponse = {
    //   id: interview.id,
    //   currentCategory: interviewDefinition.categories[0].id,
    //   currentPage: interviewDefinition.categories[0].pages[0].id,
    //   values: Object.getOwnPropertyNames(interview.fieldValues).map(itemKey => ({ id: itemKey, value: interview.fieldValues[itemKey] } as IInterviewEvaluateFieldResponse)),
    // };




    if (req.action === InterviewEvaluationAction.Initialize) {

      interview.fieldStatus = (previousInterview?.fieldStatus || []).map(item => ({
        ...item
      } as IInterviewFieldStatus));

      interview.categories = interviewDefinition.categories.map(item => ({
        name: item.name,
        displayName: item.displayName,
        description: item.description,
        order: item.order,
      })).sort((itemA, itemB) => itemA.order == itemB.order ? 0 : (itemA.order < itemB.order ? -1 : 1));

      interview.currentCategory = previousInterview?.currentCategory || interview.categories[0].name;

      const currentCategoryDef = interviewDefinition.categories.find(item => item.name === interview.currentCategory);
      interview.currentCategoryPages = currentCategoryDef.pages.map(pageItem => ({
        name: pageItem.name,
        displayName: pageItem.displayName,
        description: pageItem.description,
        order: pageItem.order,
      }));

      interview.currentPage = previousInterview?.currentPage || interview.currentCategoryPages[0].name;

      const currentPageDef = currentCategoryDef.pages.find(item => item.name === interview.currentPage);
      interview.currentPageFields = currentPageDef.fields.map(fieldItem => ({
        name: fieldItem.name,
        label: fieldItem.label,
        description: fieldItem.description
      }));

    }

    this.fieldsEvaluation(interview, interviewDefinition);
  }

  fieldsEvaluation(interview: IInterviewInstance, interviewDefinition: IInterviewDefinition) {
    for (let category of interviewDefinition.categories) {
      if (category.pages) {
        for (let page of category.pages) {
          if (page.fields) {
            for (let field of page.fields) {
              field.validators?.forEach(validatorItem => {
                let fieldStatus = interview.fieldStatus.find(persistedFieldItem => persistedFieldItem.name === field.name);
                if (!fieldStatus) {
                  fieldStatus = {
                    name: field.name,
                    value: undefined
                  } as IInterviewFieldStatus;
                  interview.fieldStatus.push(fieldStatus);
                }
                const evaluationResult = validatorItem.rule(fieldStatus, interview.fieldStatus);
                if (evaluationResult) {
                  fieldStatus.evaluationResult.push(evaluationResult);
                }
              });
            }
          }
        }
      }
    }
  }


  getInterviewDefinition(id: string): IInterviewDefinition {
    return this.store.selectSnapshot(InterviewService.interviewDefinitionsSelector).find(item => item.id === id);
  }

  getInterviewInstance(id: string): IPersistedInterviewStatus {
    return this.store.selectSnapshot(InterviewService.interviewInstancesSelector).find(item => item.id === id);
  }


}

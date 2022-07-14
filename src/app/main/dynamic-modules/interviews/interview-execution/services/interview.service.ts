import { Persistence, StateRepository } from '@angular-ru/ngxs/decorators';
import { NgxsDataRepository } from '@angular-ru/ngxs/repositories';
import { Injectable } from '@angular/core';
import { Selector, State, Store } from '@ngxs/store';
import { EvaluatorService } from '../evaluation/services/evaluator.service';
import { IInterviewEvaluateRequest, IInterviewFieldStatus, InterviewEvaluationAction, IPersistedInterviewStatus } from '../models/executing-interview';
import { IInterviewEvaluationResult } from '../models/interview-evaluation-result';
import { IInterviewConfig } from '../models/interview.config';
import { InterviewDefinition } from './../models/interview-definition';
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
        description: fieldItem.description,
        metadata: fieldItem.metadata
      }));

    }

    const evaluationResult = this.interviewEvaluation(interview, interviewDefinition, req);

    this.formatForm(interview, evaluationResult);

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

  interviewEvaluation(interview: IInterviewInstance, interviewDefinition: InterviewDefinition, req: IInterviewEvaluateRequest) {

    const evaluatorService = new EvaluatorService(interviewDefinition, interview.fieldStatus);

    for (let category of interviewDefinition.categories) {
      if (category.pages) {
        for (let page of category.pages) {
          if (page.fields) {
            for (let field of page.fields) {
              let fieldStatus = interview.fieldStatus.find(persistedFieldItem => persistedFieldItem.name === field.name);
              if (!fieldStatus) {
                fieldStatus = {
                  name: field.name,
                  value: undefined
                } as IInterviewFieldStatus;
                interview.fieldStatus.push(fieldStatus);
              }

              const fieldEvaluationResult = evaluatorService.evaluateField(fieldStatus.name);
              fieldStatus.evaluationResult = fieldEvaluationResult;

            }
          }
        }
      }
    }

    const evaluationResult = {} as IInterviewEvaluationResult;

    const currentPageFieldStatus = interview.currentPageFields.map(pageField => interview.fieldStatus.find(fieldStatus => fieldStatus.name === pageField.name));

    switch (req.action) {
      case InterviewEvaluationAction.First:
        {
          const categoryRef = interviewDefinition.categories[0];
          evaluationResult.targetCategory = categoryRef.name;
          evaluationResult.targetPage = categoryRef.pages[0].name;
        }
        break;
      case InterviewEvaluationAction.Previous:
        {
          const { categoryRef, categoryIndex, pageIndex } = (interviewDefinition as InterviewDefinition).getCategoryAndPageIndexes(interview.currentCategory, interview.currentPage);
          if (pageIndex > 0) {
            evaluationResult.targetPage = categoryRef.pages[pageIndex - 1].name;
          } else if (categoryIndex > 0) {
            const newCategoryRef = interviewDefinition.categories[categoryIndex - 1];
            evaluationResult.targetCategory = newCategoryRef.name;
            evaluationResult.targetPage = newCategoryRef.pages[newCategoryRef.pages.length - 1].name;
          }
        }
        break;
      case InterviewEvaluationAction.Next:
        {
          const { categoryRef, categoryIndex, pageIndex } = (interviewDefinition as InterviewDefinition).getCategoryAndPageIndexes(interview.currentCategory, interview.currentPage);
          if (pageIndex < categoryRef.pages.length - 1) {
            evaluationResult.targetPage = categoryRef.pages[pageIndex + 1].name;
          } else if (categoryIndex < interviewDefinition.categories.length - 1) {
            const newCategoryRef = interviewDefinition.categories[categoryIndex + 1];
            evaluationResult.targetCategory = newCategoryRef.name;
            evaluationResult.targetPage = newCategoryRef.pages[0].name;
          }
        }

        break;
      case InterviewEvaluationAction.Last:
        {
          const categoryRef = interviewDefinition.categories[interview.categories.length - 1];
          evaluationResult.targetCategory = categoryRef.name;
          evaluationResult.targetPage = categoryRef.pages[categoryRef.pages.length - 1].name;
        }

        break;
      case InterviewEvaluationAction.Initialize:
      case InterviewEvaluationAction.PostBack:
        {
          evaluationResult.targetCategory = interview.currentCategory;
          evaluationResult.targetPage = interview.currentPage;
        }

        break;
    }

    return evaluationResult;
  }


  getInterviewDefinition(id: string): InterviewDefinition {
    const partial = this.store.selectSnapshot(InterviewService.interviewDefinitionsSelector).find(item => item.id === id);
    return new InterviewDefinition(partial);
  }

  getInterviewInstance(id: string): IPersistedInterviewStatus {
    return this.store.selectSnapshot(InterviewService.interviewInstancesSelector).find(item => item.id === id);
  }


}

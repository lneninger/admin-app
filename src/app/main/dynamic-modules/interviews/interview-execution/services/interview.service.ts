import { IItemEvaluationResult } from './../evaluation/services/evaluator.models';
import { DataAction, Payload, Persistence, StateRepository } from '@angular-ru/ngxs/decorators';
import { NgxsDataRepository } from '@angular-ru/ngxs/repositories';
import { Injectable } from '@angular/core';
import { Selector, State, Store } from '@ngxs/store';
import { EvaluatorService } from '../evaluation/services/evaluator.service';
import { IInterviewEvaluateRequest, IInterviewFieldStatus, InterviewEvaluationAction, IPersistedInterviewStatus } from '../models/executing-interview';
import { IInterviewPagingResult } from '../models/interview-evaluation-result';
import { IInterviewConfig } from '../models/interview.config';
import { InterviewDefinition } from './../models/interview-definition';
import { IInterviewInstance, InterviewInstance } from './../models/interview-instance';
import { IInterviewStateModel } from './interview-state.models';
import { vitae1 } from './moked-data';
import { append, patch, updateItem } from '@ngxs/store/operators';

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

    const interviewDefinition = this.getInterviewDefinition(interview.id);
    const previousInterview = this.getInterviewInstance(interview.id);


    let evaluationResult: IItemEvaluationResult[];
    let pagingResult: IInterviewPagingResult;
    if (req.action !== InterviewEvaluationAction.Initialize) {
      // TODO: update interview status field values

      // evaluate
      evaluationResult = this.interviewEvaluation(interview, interviewDefinition, req);

      // calculate paging outcome
      pagingResult = this.paging(interview, interviewDefinition, req);
    } else {
      // calculate paging
      pagingResult = {
        targetCategory: previousInterview.currentCategory,
        targetPage: previousInterview.currentPage
      } as IInterviewPagingResult;
    }

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


    this.formatForm(interview, pagingResult);
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

  interviewEvaluation(interview: IInterviewInstance, interviewDefinition: InterviewDefinition, req: IInterviewEvaluateRequest) {

    // Save interview fields status base on request value object.
    const currentFieldStatus = interview.fieldStatus || [];
    if (req.value) {
      for (const prop of Object.getOwnPropertyNames(req.value)) {
        const itemStatus = currentFieldStatus.find(fieldStatusItem => fieldStatusItem.name === prop);
        if (itemStatus) {
          itemStatus.value = req.value[prop];
          itemStatus.date = new Date();
        } else {
          currentFieldStatus.push({
            name: prop,
            date: new Date(),
            value: req.value[prop],
          } as IInterviewFieldStatus);
        }
      }
    }

    // get fields status as key value pair representation.
    const flatKeyValueRepresentation = {};
    for (const fieldStatusItem of currentFieldStatus) {
      flatKeyValueRepresentation[fieldStatusItem.name] = fieldStatusItem.value;
    }

    const evaluatorService = new EvaluatorService(interviewDefinition, interview.fieldStatus);
    const evaluationResult = evaluatorService.evaluateInterview();


    return evaluationResult;
  }

  paging(interview: IInterviewInstance, interviewDefinition: InterviewDefinition, req: IInterviewEvaluateRequest) {
    const result = {} as IInterviewPagingResult;

    // const currentPageFieldStatus = interview.currentPageFields.map(pageField => interview.fieldStatus.find(fieldStatus => fieldStatus.name === pageField.name));

    switch (req.action) {
      case InterviewEvaluationAction.First:
        {
          const categoryRef = interviewDefinition.categories[0];
          result.targetCategory = categoryRef.name;
          result.targetPage = categoryRef.pages[0].name;
        }
        break;
      case InterviewEvaluationAction.Previous:
        {
          const { categoryRef, categoryIndex, pageIndex } = interviewDefinition.getCategoryAndPageIndexes(interview.currentCategory, interview.currentPage);
          if (pageIndex > 0) {
            result.targetPage = categoryRef.pages[pageIndex - 1].name;
          } else if (categoryIndex > 0) {
            const newCategoryRef = interviewDefinition.categories[categoryIndex - 1];
            result.targetCategory = newCategoryRef.name;
            result.targetPage = newCategoryRef.pages[newCategoryRef.pages.length - 1].name;
          }
        }
        break;
      case InterviewEvaluationAction.Next:
        {
          const { categoryRef, categoryIndex, pageIndex } = interviewDefinition.getCategoryAndPageIndexes(interview.currentCategory, interview.currentPage);
          if (pageIndex < categoryRef.pages.length - 1) {
            result.targetPage = categoryRef.pages[pageIndex + 1].name;
          } else if (categoryIndex < interviewDefinition.categories.length - 1) {
            const newCategoryRef = interviewDefinition.categories[categoryIndex + 1];
            result.targetCategory = newCategoryRef.name;
            result.targetPage = newCategoryRef.pages[0].name;
          }
        }

        break;
      case InterviewEvaluationAction.Last:
        {
          const categoryRef = interviewDefinition.categories[interview.categories.length - 1];
          result.targetCategory = categoryRef.name;
          result.targetPage = categoryRef.pages[categoryRef.pages.length - 1].name;
        }

        break;
      case InterviewEvaluationAction.Initialize:
      case InterviewEvaluationAction.PostBack:
        {
          result.targetCategory = interview.currentCategory;
          result.targetPage = interview.currentPage;
        }

        break;
    }

    return result;
  }


  getInterviewDefinition(id: string): InterviewDefinition {
    const partial = this.store.selectSnapshot(InterviewService.interviewDefinitionsSelector).find(item => item.id === id);
    return new InterviewDefinition(partial);
  }

  getInterviewInstance(id: string): IPersistedInterviewStatus {
    return this.store.selectSnapshot(InterviewService.interviewInstancesSelector).find(item => item.id === id);
  }


}

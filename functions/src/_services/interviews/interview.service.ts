import * as admin from 'firebase-admin';


import { Utilities } from 'src/app/shared/common/utilities';
import { EvaluatorService } from './evaluation/services/evaluator.service';
import { IInterviewFieldStatus, IItemEvaluationResult, InterviewEvaluationAction, IPersistedInterviewFieldStatus, IPersistedInterviewStatus } from './interview.models';
import { IInterviewDefinition, InterviewDefinition } from './models/interview-definition';
import { IInterviewPagingResult } from './models/interview-evaluation-result';

export class InterviewService {
  async evaluate(req: IInterviewEvaluateRequest){
    const interviewDefinition = await this.getInterviewDefinition(req.id);
    const previousInterview = await this.getInterviewInstance(interview.id);


    let evaluationResult: IItemEvaluationResult[];
    let pagingResult: IInterviewPagingResult;
    let newInterviewFieldStatus: any;
    if (req.action !== InterviewEvaluationAction.Initialize) {
      // TODO: update interview status field values
      // Update interview fields status base on request value object.
      newInterviewFieldStatus = this.mergeFieldStatus(previousInterview.fieldStatus, req.value);

      // evaluate
      evaluationResult = this.interviewEvaluation(newInterviewFieldStatus, interviewDefinition);

      // calculate paging outcome
      pagingResult = this.paging(previousInterview, evaluationResult, interviewDefinition, req);
    } else {
      // calculate paging
      pagingResult = {
        targetCategory: previousInterview.currentCategory,
        targetPage: previousInterview.currentPage
      } as IInterviewPagingResult;
    }

    const interview = this.formatEvaluationResult(evaluationResult, interviewDefinition, pagingResult);
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
          if (pageIndex! > 0) {
            result.targetPage = categoryRef!.pages[pageIndex! - 1].name;
          } else if (categoryIndex! > 0) {
            const newCategoryRef = interviewDefinition.categories[categoryIndex! - 1];
            result.targetCategory = newCategoryRef.name;
            result.targetPage = newCategoryRef.pages[newCategoryRef.pages.length - 1].name;
          }
        }
        break;
      case InterviewEvaluationAction.Next:
        {
          const { categoryRef, categoryIndex, pageIndex } = interviewDefinition.getCategoryAndPageIndexes(interview.currentCategory, interview.currentPage);
          if (pageIndex! < categoryRef!.pages.length - 1) {
            result.targetPage = categoryRef!.pages[pageIndex! + 1].name;
          } else if (categoryIndex! < interviewDefinition.categories.length - 1) {
            const newCategoryRef = interviewDefinition.categories[categoryIndex! + 1];
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

  private formatEvaluationResult(interview: IInterviewInstance, previousInterview: IPersistedInterviewStatus, interviewDefinition: InterviewDefinition, pagingResult: IInterviewPagingResult) {
    // interview.fieldStatus = (previousInterview?.fieldStatus || []).map(item => ({
    //   ...item
    // } as IInterviewFieldStatus));
    const result =

    interview.categories = interviewDefinition.categories.map(item => ({
      name: item.name,
      displayName: item.displayName,
      description: item.description,
      order: item.order,
    })).sort((itemA, itemB) => itemA.order == itemB.order ? 0 : (itemA.order < itemB.order ? -1 : 1));

    interview.currentCategory = pagingResult.targetCategory || interview.categories[0].name;

    const currentCategoryDef = interviewDefinition.categories.find(item => item.name === interview.currentCategory);
    interview.currentCategoryPages = currentCategoryDef!.pages.map(pageItem => ({
      name: pageItem.name,
      displayName: pageItem.displayName,
      description: pageItem.description,
      order: pageItem.order,
    }));

    interview.currentPage = pagingResult.targetPage || interview.currentCategoryPages[0].name;

    const currentPageDef = currentCategoryDef!.pages.find(item => item.name === interview.currentPage);
    interview.currentPageFields = currentPageDef!.fields.map(fieldItem => ({
      name: fieldItem.name,
      label: fieldItem.label,
      description: fieldItem.description,
      metadata: fieldItem.metadata
    }));
  }

  interviewEvaluation(interviewFieldStatus: IInterviewFieldStatus[], interviewDefinition: InterviewDefinition) {
    const values:{[ket:string]: any | undefined} = {};
    for (const fieldStatusItem of interviewFieldStatus) {
      values[fieldStatusItem.name] = fieldStatusItem.value;
    }

    const evaluatorService = new EvaluatorService(values, interviewDefinition);
    return evaluatorService.evaluateInterview();
  }


  mergeFieldStatus(fieldStatus: IPersistedInterviewFieldStatus[], newValue: any) {
    const result = fieldStatus.map(item => ({...item}));
    if (newValue) {
      for (const prop of Object.getOwnPropertyNames(newValue)) {
        const itemStatus = result.find(fieldStatusItem => fieldStatusItem.name === prop);
        if (itemStatus) {
          itemStatus.value = newValue[prop];
          itemStatus.date = new Date();
        } else {
          result.push({
            name: prop,
            date: new Date(),
            value: newValue[prop],
          } as IInterviewFieldStatus);
        }
      }
    }

    return result;
  }


  async getInterviewDefinition(id: string): Promise<InterviewDefinition> {
    const defRef = (await admin.firestore().collection('/interview-definition').doc(id).get());
    const definitionData = defRef.data() as IInterviewDefinition;
    return new InterviewDefinition(definitionData);
  }

  async getInterviewInstance(id: string): Promise<IPersistedInterviewStatus> {
    const executionRef = (await admin.firestore().collection('/interview-execution').doc(id).get());
    return executionRef.data() as IPersistedInterviewStatus;
  }
}

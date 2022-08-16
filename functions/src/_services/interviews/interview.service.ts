import * as admin from 'firebase-admin';
import { ICustomMapping, IFireStoreDocument } from '../../functions.models';
import { IItemEvaluationResult } from './evaluation/services/evaluator.models';


import { EvaluatorService } from './evaluation/services/evaluator.service';
import { IInterviewEvaluateRequest, IInterviewFieldStatus, InterviewEvaluationAction, IPersistedInterviewFieldStatus, IPersistedInterviewStatus } from './interview.models';
import { IInterviewDefinition, InterviewDefinition } from './models/interview-definition';
import { IInterviewEvaluateResponse } from './models/interview-evaluation-response';
import { IInterviewPagingResult } from './models/interview-paging-result';

export class InterviewService {
  async evaluate(req: IInterviewEvaluateRequest): Promise<IInterviewEvaluateResponse> {
    const interviewDefinition = await this.getInterviewDefinition(req.type);
    const previousInterview = await this.getInterviewInstance(req);

    let instanceId = previousInterview?.id;
    let evaluationResult: IItemEvaluationResult[];
    let pagingResult: IInterviewPagingResult;
    let newInterviewFieldStatus: any;
    if (req.action == InterviewEvaluationAction.Initialize) {
      evaluationResult = [];
      // calculate paging
      pagingResult = {
        targetCategory: previousInterview?.data.currentCategory,
        targetPage: previousInterview?.data.currentPage
      } as IInterviewPagingResult;

      if (!previousInterview) {
        instanceId = await this.generateInstanceId(req, interviewDefinition);
      }

    } else {


      // TODO: update interview status field values
      // Update interview fields status base on request value object.
      newInterviewFieldStatus = this.mergeFieldStatus(previousInterview!.data?.fieldStatus, req.value);

      // evaluate
      evaluationResult = this.interviewEvaluation(newInterviewFieldStatus, interviewDefinition);

      // calculate paging outcome
      pagingResult = this.paging(previousInterview!, evaluationResult, interviewDefinition, req);

    }

    const interview = this.buildEvaluationResult(evaluationResult, interviewDefinition, pagingResult);

    const fieldStatus = this.buildEvaluationStatus(evaluationResult, newInterviewFieldStatus);

    if (instanceId) {
      const status: IPersistedInterviewStatus = {
        id: instanceId,
        currentCategory: interview.currentCategory as string,
        currentPage: interview.currentPage,
        fieldStatus,
        maxVisitedCategory: '',
        maxVisitedPage: ''
      };
      this.saveInterviewInstance(instanceId, status);
    }
    return interview;
  }
  buildEvaluationStatus(evaluationResult: IItemEvaluationResult[], fieldValues: ICustomMapping): IPersistedInterviewFieldStatus[] {
    const date = new Date();
    return evaluationResult.map(evaluationItem => {
      return {
        name: evaluationItem.name,
        value: fieldValues[evaluationItem.name],
        date: date
      } as IPersistedInterviewFieldStatus;
    })
  }
  async generateInstanceId(req: IInterviewEvaluateRequest, interviewDefinition: InterviewDefinition): Promise<string> {
    const date = new Date();
    return `${req.type}_${date.getFullYear()}_${date.getMonth()}_${date.getDay()}`;
  }

  paging(previousInterview: IFireStoreDocument<IPersistedInterviewStatus>, evaluationResult: IItemEvaluationResult[], interviewDefinition: InterviewDefinition, req: IInterviewEvaluateRequest) {
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
          const { categoryRef, categoryIndex, pageIndex } = interviewDefinition.getCategoryAndPageIndexes(previousInterview.data.currentCategory, previousInterview.data.currentPage);
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
          const { categoryRef, categoryIndex, pageIndex } = interviewDefinition.getCategoryAndPageIndexes(previousInterview.data.currentCategory, previousInterview.data.currentPage);
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
          const categoryRef = interviewDefinition.categories[interviewDefinition.categories.length - 1];
          result.targetCategory = categoryRef.name;
          result.targetPage = categoryRef.pages[categoryRef.pages.length - 1].name;
        }

        break;
      case InterviewEvaluationAction.Initialize:
      case InterviewEvaluationAction.PostBack:
        {
          result.targetCategory = previousInterview.data.currentCategory;
          result.targetPage = previousInterview.data.currentPage;
        }

        break;
    }

    return result;
  }

  private buildEvaluationResult(evaluationResult: IItemEvaluationResult[], interviewDefinition: InterviewDefinition, pagingResult: IInterviewPagingResult) {

    const categories = interviewDefinition.categories.map(item => ({
      name: item.name,
      displayName: item.displayName,
      description: item.description,
      order: item.order,
    })).sort((itemA, itemB) => itemA.order == itemB.order ? 0 : (itemA.order < itemB.order ? -1 : 1));

    const currentCategory = pagingResult.targetCategory || interviewDefinition.categories[0].name;

    const currentCategoryDef = interviewDefinition.categories.find(item => item.name === currentCategory);
    const currentCategoryPages = currentCategoryDef!.pages.map(pageItem => ({
      name: pageItem.name,
      displayName: pageItem.displayName,
      description: pageItem.description,
      order: pageItem.order,
    }));

    const currentPage = pagingResult.targetPage || currentCategoryPages[0].name;

    const currentPageDef = currentCategoryDef!.pages.find(item => item.name === currentPage);
    const currentPageFields = currentPageDef!.fields.map(fieldItem => ({
      name: fieldItem.name,
      label: fieldItem.label,
      description: fieldItem.description,
      metadata: fieldItem.metadata,
      value: null
    }));

    const result: IInterviewEvaluateResponse = { categories, currentCategory, currentCategoryPages, currentPage, currentPageFields };

    return result;
  }

  interviewEvaluation(interviewFieldStatus: IInterviewFieldStatus[], interviewDefinition: InterviewDefinition): IItemEvaluationResult[] {
    const values: { [ket: string]: any | undefined } = {};
    for (const fieldStatusItem of interviewFieldStatus) {
      values[fieldStatusItem.name] = fieldStatusItem.value;
    }

    const evaluatorService = new EvaluatorService(values, interviewDefinition);
    return evaluatorService.evaluateInterview();
  }


  mergeFieldStatus(fieldStatus: IPersistedInterviewFieldStatus[], newValue: any): IInterviewFieldStatus[] {
    const result = fieldStatus.map(item => ({ ...item }));
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
    const defRef = (await admin.firestore().collection('/app-interview-definitions').doc(id).get());
    const definitionData = defRef.data() as IInterviewDefinition;
    console.log(`Resolved definition for ${id} => `, definitionData);
    return new InterviewDefinition(definitionData);
  }

  async getInterviewInstance(request: IInterviewEvaluateRequest): Promise<IFireStoreDocument<IPersistedInterviewStatus> | undefined> {
    const elements = await admin.firestore().collection('/app-interview-executions').where('type', '==', request.type).limit(1).get();
    if (elements.size == 1) {
      return InterviewService.mapInterviewStatus(elements[0]);
    }

    return undefined;
  }

  saveInterviewInstance(id: string, status: IPersistedInterviewStatus): Promise<admin.firestore.WriteResult> {
    return admin.firestore().collection('/app-interview-executions').doc(id).set(status);
  }

  static mapInterviewStatus(doc: any) {
    return ({ id: doc.id, data: doc.data(), $original: doc } as IFireStoreDocument<IPersistedInterviewStatus>);
  }
}

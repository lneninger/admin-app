import * as admin from 'firebase-admin';
import { ICustomMapping, IFireStoreDocument } from '../../functions.models';
import { EvaluationLevel, IItemEvaluationResult, IItemEvaluationResultGrouping } from './evaluation/services/evaluator.models';


import { EvaluatorService } from './evaluation/services/evaluator.service';
import { IInterviewEvaluateRequest, IInterviewFieldStatus, InterviewEvaluationAction, IPersistedInterviewFieldStatus, IPersistedInterviewStatus } from './interview.models';
import { IInterviewDefinition, InterviewDefinition } from './models/interview-definition';
import { IInterviewEvaluateResponse } from './models/interview-evaluation-response';
import { EvaluationType } from './models/interview-field';
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
      } else {
        instanceId = previousInterview.id;
      }

      newInterviewFieldStatus = this.mergeFieldStatus(interviewDefinition, previousInterview?.data?.fieldStatus || [], {});
      evaluationResult = this.interviewEvaluation(newInterviewFieldStatus, interviewDefinition);


    } else {
      instanceId = previousInterview?.id;

      // Update interview fields status base on request value object.
      newInterviewFieldStatus = this.mergeFieldStatus(interviewDefinition, previousInterview!.data?.fieldStatus, req.value);

      // evaluate
      evaluationResult = this.interviewEvaluation(newInterviewFieldStatus, interviewDefinition);

      // calculate paging outcome
      pagingResult = this.paging(previousInterview!, evaluationResult, interviewDefinition, req);

    }

    console.log('interviewDefinition pages => ', interviewDefinition.categories[0].pages);

    console.log('newInterviewFieldStatus => ', newInterviewFieldStatus);

    const evaluatableStatus = this.buildEvaluationStatus(evaluationResult, newInterviewFieldStatus);
    const interview = this.buildEvaluationResult(evaluationResult, evaluatableStatus, interviewDefinition, pagingResult, previousInterview);




    if (instanceId) {
      const status: IPersistedInterviewStatus = {
        id: instanceId,
        currentCategory: interview.currentCategory as string,
        currentPage: interview.currentPage,
        fieldStatus: evaluatableStatus,
        maxVisitedCategory: interview.maxVisitedCategory,
        maxVisitedPage: interview.maxVisitedPage
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
        date: date,
        status: this.formatItemEvaluationResult(evaluationItem).status
      } as IPersistedInterviewFieldStatus;
    })
  }

  async generateInstanceId(req: IInterviewEvaluateRequest, interviewDefinition: InterviewDefinition): Promise<string> {
    const date = new Date();
    return `${req.type}_${date.getFullYear()}_${date.getMonth()}_${date.getDay()}`;
  }

  paging(previousInterview: IFireStoreDocument<IPersistedInterviewStatus>, evaluationResult: IItemEvaluationResult[], interviewDefinition: InterviewDefinition, req: IInterviewEvaluateRequest) {
    const result = {} as IInterviewPagingResult;

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

  private buildEvaluationResult(evaluationResult: IItemEvaluationResult[], evaluatableStatus: any, interviewDefinition: InterviewDefinition, pagingResult: IInterviewPagingResult, previousInterview: IFireStoreDocument<IPersistedInterviewStatus> | undefined) {

    const categories = interviewDefinition.categories.map(item => ({
      name: item.name,
      displayName: item.displayName,
      description: item.description,
      order: item.order,
    })).sort((itemA, itemB) => itemA.order == itemB.order ? 0 : (itemA.order < itemB.order ? -1 : 1));

    const currentCategory = pagingResult.targetCategory || interviewDefinition.categories[0].name;
    const currentCategoryIndex = interviewDefinition.categories.findIndex(catItem => catItem.name === currentCategory);

    const currentCategoryDef = interviewDefinition.categories.find(item => item.name === currentCategory);
    const currentCategoryPages = currentCategoryDef!.pages.map(pageItem => ({
      name: pageItem.name,
      displayName: pageItem.displayName,
      description: pageItem.description,
      order: pageItem.order,
    }));

    const currentPage = pagingResult.targetPage || currentCategoryPages[0].name;
    const currentPageIndex = currentCategoryPages.findIndex(pageItem => pageItem.name === currentPage);

    const currentPageDef = currentCategoryDef!.pages.find(item => item.name === currentPage);
    const currentPageFields = currentPageDef!.fields.map(fieldItem => {
      const fieldEvaluation = evaluationResult.find(evaluation => evaluation.name === fieldItem.name && evaluation.level === EvaluationLevel.Field);
      return {
        name: fieldItem.name,
        label: fieldItem.label,
        description: fieldItem.description,
        metadata: fieldItem.metadata,
        evaluations: this.formatItemEvaluationResult(fieldEvaluation),
        value: evaluatableStatus[fieldItem.name]
      };
    });

    const maxCategoryIndex = interviewDefinition.categories.findIndex(catItem => catItem.name === previousInterview?.data.maxVisitedCategory);


    let maxVisitedCategory: string;
    let maxVisitedPage: string;
    if (maxCategoryIndex > currentCategoryIndex) {
      maxVisitedCategory = <string>previousInterview?.data.maxVisitedCategory;
      maxVisitedPage = <string>previousInterview?.data.maxVisitedPage;
    } else if (maxCategoryIndex < currentCategoryIndex) {
      maxVisitedCategory = <string>currentCategory;
      maxVisitedPage = currentPage;
    } else {
      maxVisitedCategory = <string>previousInterview?.data.maxVisitedCategory;
      const maxPageIndex = currentCategoryDef?.pages.findIndex(pageItem => pageItem.name === previousInterview?.data.maxVisitedCategory);
      maxVisitedPage = (maxPageIndex || -1) > currentPageIndex ? <string>previousInterview?.data.maxVisitedCategory : currentPage;

    }


    const result: IInterviewEvaluateResponse = {
      categories,
      currentCategory,
      currentCategoryIndex,
      maxVisitedCategory,
      currentCategoryPages,
      currentPage,
      currentPageIndex,
      maxVisitedPage,
      currentPageFields
    };

    return result;
  }
  formatItemEvaluationResult(fieldEvaluation: IItemEvaluationResult | undefined): IItemEvaluationResultGrouping {
    const fails = fieldEvaluation?.evaluations.filter(item => item.evaluationResult.evaluationResult === false && [EvaluationType.Validation, EvaluationType.Disqualification].some(validationItem => validationItem === item.evaluator.type)) || [];
    const errors = fails.filter(fail => fail.evaluator.type === EvaluationType.Validation);
    const disqualifications = fails.filter(fail => fail.evaluator.type === EvaluationType.Disqualification);

    const valids = fieldEvaluation?.evaluations.filter(item => item.evaluationResult.evaluationResult === true) || [];
    const disables = valids.filter(item => item.evaluationResult.evaluationResult === true && [EvaluationType.Disable].some(validationItem => validationItem === item.evaluator.type));
    const hiddens = valids.filter(item => item.evaluationResult.evaluationResult === true && [EvaluationType.Hide].some(validationItem => validationItem === item.evaluator.type));

    let status: EvaluationType = EvaluationType.Unvalidated;
    if (disqualifications.length > 0) {
      status = EvaluationType.Disqualification;
    } else if (errors.length > 0) {
      status = EvaluationType.Validation;
    } else if (disables.length > 0) {
      status = EvaluationType.Disable;
    } else if (hiddens.length > 0) {
      status = EvaluationType.Hide;
    }
    return { status, fails, errors, disqualifications, valids, disables, hiddens } as IItemEvaluationResultGrouping;
  }

  interviewEvaluation(interviewFieldStatus: IInterviewFieldStatus[], interviewDefinition: InterviewDefinition): IItemEvaluationResult[] {
    const values: { [key: string]: any | undefined } = {};
    for (const fieldStatusItem of interviewFieldStatus) {
      values[fieldStatusItem.name] = fieldStatusItem.value;
    }

    console.log('interviewFieldStatus => ', interviewFieldStatus);

    const evaluatorService = new EvaluatorService(values, interviewDefinition);
    return evaluatorService.evaluateInterview();
  }


  mergeFieldStatus(interviewDefinition: IInterviewDefinition, fieldStatus: IPersistedInterviewFieldStatus[], newValue: any): IInterviewFieldStatus[] {

    console.log('Before Definition fields => ');
    const definitionFields = {};
    for (const cat of interviewDefinition.categories) {

      if (cat.pages) {
        for (const page of cat.pages) {
          if (page.fields) {
            for (const field of page.fields) {
              definitionFields[field.name] = undefined;
            }
          }
        }
      }

    }

    console.log('Definition fields => ', definitionFields);

    const values = { ...definitionFields, ...newValue }

    const result = fieldStatus.map(item => ({ ...item }));
    if (newValue) {
      for (const prop of Object.getOwnPropertyNames(values)) {
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

  static mapInterviewStatus(doc: any): IFireStoreDocument<IPersistedInterviewStatus> {
    return ({ id: doc.id, data: doc.data(), $original: doc } as IFireStoreDocument<IPersistedInterviewStatus>);
  }
}

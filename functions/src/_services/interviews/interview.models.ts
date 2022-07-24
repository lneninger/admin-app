import { EvaluationLevel } from './evaluation/services/evaluator.models';
import { IEvaluatorDefinition } from './models/interview-field';

export interface IInterviewEvaluationRequest {
  id: string;
  action: InterviewEvaluationAction;
  pageInfo?: IInterviewEvaluatePageInfo;
  value?: any;
}


export interface IInterviewEvaluatePageInfo {
  currentCategory: string;
  currentPage: string;
  currentVariable?: string;
}

export enum InterviewEvaluationAction {
  Initialize = 'INITIALIZE',
  First = 'FIRST',
  Previous = 'PREVIOUS',
  Next = 'NEXT',
  Last = 'LAST',
  PostBack = 'POSTBACK',
}


export interface IInterviewEvaluateRequest {
  id: string;
  action: InterviewEvaluationAction;
  pageInfo?: IInterviewEvaluatePageInfo;
  value?: any;
}


export interface IPersistedInterviewStatus {
  id: string;
  currentCategory: string;
  currentPage: string;

  maxVisitedCategory: string;
  maxVisitedPage: string;

  fieldStatus: IPersistedInterviewFieldStatus[];
}

export interface IInterviewFieldStatus {
  name: string;
  value: any;
  date?: Date;
  evaluationResult?: IItemEvaluationResultResponse;
}

export interface IPersistedInterviewFieldStatus {
  name: string;
  value: any;
  date?: Date;
}


export interface IEvaluatorDefinitionCompilation extends IEvaluatorDefinition {
  compilation: (evaluator: IEvaluatorDefinition, target: { [key: string]: any }) => IEvaluatorResult;
}


export interface IItemEvaluationResultResponse {
  name: string;
  level: EvaluationLevel;
  evaluations: IEvaluationResultItemResponse[]
}


export interface IEvaluationResultItemResponse {
  evaluator: IEvaluatorDefinitionCompilation,
  evaluationResult: IEvaluatorResult
}


export interface IEvaluatorResult {
  continue: boolean;
  evaluationResult: any;
}



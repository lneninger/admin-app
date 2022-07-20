import { FieldEvalutionResultArray } from '../evaluation/services/evaluator.models';
import { IInterviewCategory } from './interview-category';






export interface IInterviewEvaluateRequest {
  action: InterviewEvaluationAction;
  pageInfo?: IInterviewEvaluatePageInfo;
  value?: any;
}

export interface IInterviewEvaluateResponse{
    id: string;
    categories?: IInterviewCategory[]; // only for initialize
    values: IInterviewEvaluateFieldResponse[]; //
    currentCategory: string/*same category*/ | IInterviewEvaluateCurrentCategoryResponse/*category changed, need to bring the pages*/;
    currentPage: string/**/;
}

export interface IInterviewEvaluateCurrentCategoryResponse{
  pages: IInterviewEvaluateCurrentCategoryPageResponse[]
}
export interface IInterviewEvaluateCurrentCategoryPageResponse{
  id: string;
  name: string;
}

export interface IInterviewEvaluateFieldResponse{
  id: string;
  name: string;
  value: any;
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


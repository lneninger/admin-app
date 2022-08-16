import { IInterviewCategoryResponse } from './interview-category-response';




export interface IInterviewEvaluateResponse {
  categories?: IInterviewCategoryResponse[]; // only for initialize
  currentCategory: string/*same category*/ | IInterviewEvaluateCurrentCategoryResponse/*category changed, need to bring the pages*/;
  currentCategoryIndex: number;
  maxVisitedCategory: string;
  currentCategoryPages: IInternviewCurrentCategoryPage[];
  currentPage: string/**/;
  currentPageIndex: number;
  maxVisitedPage: string;
  currentPageFields: IInterviewEvaluateFieldResponse[]; //
}

export interface IInternviewCurrentCategoryPage {
  name: string;
  displayName: string;
  description: string | undefined;
  order: number;
}

export interface IInterviewEvaluateCurrentCategoryResponse {
  pages: IInterviewEvaluateCurrentCategoryPageResponse[]
}
export interface IInterviewEvaluateCurrentCategoryPageResponse {
  id: string;
  name: string;
}

export interface IInterviewEvaluateFieldResponse {
  name: string;
  label: string;
  description: string | undefined;
  metadata: any;
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


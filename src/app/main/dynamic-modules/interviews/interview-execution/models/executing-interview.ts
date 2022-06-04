import { IInterviewCategory } from './interview-category';


export interface IExecutingInterview {
  id: string;
  categories: IInterviewCategory[];

  status?: IExecutingInterviewStatus;
}

export interface IExecutingInterviewStatus {
  currentCategory: string;
  currentCategoryPage: string;

  maxVisitedCategory: string;
  maxVisitedPage: string;
}



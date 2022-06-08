import { IInterviewCategoryPage, IInterviewCategoryPageDefinition } from './interview-page';

export interface IInterviewCategoryDefinition{
  id: string;
  name: string;
  displayName: string;
  description: string;
  order: number;
  pages: IInterviewCategoryPageDefinition[]
}

export interface IInterviewCategory {
  id: string;
  name: string;
  displayName: string;
  description: string;
  order: number;
  pages: IInterviewCategoryPage[]
}


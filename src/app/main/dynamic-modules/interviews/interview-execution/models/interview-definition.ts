import { IInterviewCategoryDefinition } from './interview-category';

export interface IInterviewDefinition{
  id: string;
  categories: IInterviewCategoryDefinition[];
}

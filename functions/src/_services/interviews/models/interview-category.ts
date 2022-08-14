import { IEvaluatorDefinition } from './interview-field';
import { IInterviewCategoryPageDefinition } from './interview-page';

export interface IInterviewCategoryDefinition{
  name: string;
  displayName: string;
  description?: string;
  order: number;
  pages: IInterviewCategoryPageDefinition[];
  evaluators: IEvaluatorDefinition[];

}




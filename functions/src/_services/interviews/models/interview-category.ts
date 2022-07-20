import { IEvaluatorDefinition } from './interview-field';
import { IInterviewCategoryPage, IInterviewCategoryPageDefinition } from './interview-page';

export interface IInterviewCategoryDefinition{
  name: string;
  displayName: string;
  description: string;
  order: number;
  pages: IInterviewCategoryPageDefinition[];
  evaluators: IEvaluatorDefinition[];

}

export interface IInterviewCategory {
  name: string;
  displayName: string;
  description: string;
  order: number;
}


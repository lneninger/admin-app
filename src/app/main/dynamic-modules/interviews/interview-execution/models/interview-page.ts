import { IInterviewField, IInterviewFieldDefinition } from './interview-field';

export interface IInterviewCategoryPageDefinition{
  id: string;
  name: string;
  displayName: string;
  description: string;
  order: number;
  fields: IInterviewFieldDefinition[];
}

export interface IInterviewCategoryPage {
  id: string;
  name: string;
  displayName: string;
  description: string;
  order: number;
}

export interface IInterviewCurrentCategoryPage extends IInterviewCategoryPage{
  fields: IInterviewField[];

}



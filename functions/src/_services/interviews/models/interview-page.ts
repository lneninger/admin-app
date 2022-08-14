import { IInterviewField, IInterviewFieldDefinition } from './interview-field';

export interface IInterviewCategoryPageDefinition{
  name: string;
  displayName: string;
  description: string | undefined;
  order: number;
  fields: IInterviewFieldDefinition[];
}

export interface IInterviewCategoryPage {
  name: string;
  displayName: string;
  description: string;
  order: number;
}

export interface IInterviewCurrentCategoryPage extends IInterviewCategoryPage{
  fields: IInterviewField[];

}



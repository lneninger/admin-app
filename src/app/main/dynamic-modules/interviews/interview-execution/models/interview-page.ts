import { IInterviewField } from './interview-field';


export interface IInterviewPage {
  id: string;
  name: string;
  displayName: string;
  description: string;
  order: number;
}


export interface IInterviewCurrentPage extends IInterviewPage {
  fields: IInterviewField[]
}


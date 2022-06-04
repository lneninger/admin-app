import { IInterviewPage } from './interview-page';

export interface IInterviewCategory {
  id: string;
  name: string;
  displayName: string;
  description: string;
  order: number;
  pages: IInterviewPage[]
}


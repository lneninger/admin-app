import { IInterviewCategoryDefinition } from './interview-category';

export interface IInterviewDefinition {
  id: string;
  categories: IInterviewCategoryDefinition[];
}


export class InterviewDefinition implements IInterviewDefinition {
  id: string;
  categories: IInterviewCategoryDefinition[];

  constructor(input: Partial<IInterviewDefinition>) {
    Object.assign(this, input);
  }
}

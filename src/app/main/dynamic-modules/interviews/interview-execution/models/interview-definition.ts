import { IInterviewCategoryDefinition } from './interview-category';

export interface IInterviewDefinition {
  id: string;
  categories: IInterviewCategoryDefinition[];

  // getCategoryAndPageIndexes(categoryName: string, pageName: string): { categoryRef: IInterviewCategoryDefinition, categoryIndex: number, pageIndex: number };
}


export class InterviewDefinition implements IInterviewDefinition {
  id: string;
  categories: IInterviewCategoryDefinition[];

  constructor(input: Partial<IInterviewDefinition>) {
    Object.assign(this, input);
  }
  getCategoryAndPageIndexes(categoryName: string, pageName: string): { categoryRef: IInterviewCategoryDefinition, categoryIndex: number; pageIndex: number; } {
    const categoryRef = this.categories.find(item => item.name === categoryName);
    const categoryIndex = this.categories.indexOf(categoryRef);

    const pageIndex = categoryRef.pages.findIndex(item => item.name === pageName);

    return { categoryRef, categoryIndex, pageIndex };
  }
}

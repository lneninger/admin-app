import { IInterviewCategoryDefinition } from './interview-category';
import { IInterviewFieldDefinition } from './interview-field';

export abstract class FieldsCategory {
  get className() {
    return this.constructor?.name;
  }

  get metadata() {
    return (this as any).$metadata;
  }
}


export interface IInterviewDefinition {
  id: undefined | string;
  categories:IInterviewCategoryDefinition[];

  // getFieldDefinition(fieldIdentifier: string): IInterviewFieldDefinition;
  // getCategoryAndPageIndexes(categoryName: string, pageName: string): { categoryRef: IInterviewCategoryDefinition, categoryIndex: number, pageIndex: number };
}

export class InterviewDefinition implements IInterviewDefinition {
  id!: string;
  categories!: IInterviewCategoryDefinition[];

  constructor(input: Partial<IInterviewDefinition>) {
    Object.assign(this, input);
  }
  getCategoryAndPageIndexes(categoryName: string, pageName: string): { categoryRef: undefined | IInterviewCategoryDefinition, categoryIndex: undefined | number; pageIndex: undefined | number; } {
    const categoryRef = this.categories?.find(item => item.name === categoryName);
    const categoryIndex = !categoryRef ? undefined : this.categories?.indexOf(categoryRef);

    const pageIndex = !categoryRef ? undefined : categoryRef.pages.findIndex(item => item.name === pageName);

    return { categoryRef, categoryIndex, pageIndex };
  }

  getFieldDefinition(fieldIdentifier: string): IInterviewFieldDefinition | null {
    if (this.categories) {
      for (let i = 0; i < this.categories.length; i++) {
        for (let j = 0; i < this.categories[i].pages?.length || 0; i++) {
          const fieldDefinition = this.categories[i].pages[j].fields.find(fieldItem => fieldItem.name === fieldIdentifier);
          if (fieldDefinition) {
            return fieldDefinition;
          }
        }
      }
    }

    return null;
  }

}

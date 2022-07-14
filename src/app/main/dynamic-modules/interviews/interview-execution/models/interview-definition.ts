import { IInterviewFieldDefinition } from './interview-field';
import { IInterviewCategoryDefinition } from './interview-category';

export abstract class FieldsCategory {
  get className() {
    return this.constructor?.name;
  }

  get metadata() {
    return (this as any).$metadata;
  }
}


export interface IInterviewDefinition {
  id: string;
  categories: IInterviewCategoryDefinition[];

  // getFieldDefinition(fieldIdentifier: string): IInterviewFieldDefinition;
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

  getFieldDefinition(fieldIdentifier: string): IInterviewFieldDefinition {
    const [categoryName, fieldName] = fieldIdentifier.split('|');
    for (let i = 0; i < this.categories.length; i++) {
      if (this.categories[i].name === categoryName) {
        for (let j = 0; i < this.categories[i].pages.length; i++) {
          const fieldDefinition = this.categories[i].pages[j].fields.find(fieldItem => fieldItem.name === fieldName);
          if (fieldDefinition) {
            return fieldDefinition;
          }
        }
      }
    }
  }

}

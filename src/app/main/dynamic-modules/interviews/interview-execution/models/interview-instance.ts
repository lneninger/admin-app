import { FormGroup } from '@angular/forms';
import { IInterviewField } from './interview-field';
import { IInterviewCategory } from './interview-category';
import { IInterviewCategoryPage } from './interview-page';
import { IInterviewConfig } from './interview.config';
import { IInterviewFieldStatus, IPersistedInterviewFieldStatus } from './executing-interview';

export interface IInterviewInstance {
  id: string;

  config: IInterviewConfig;

  currentCategory: string;
  currentPage: string;
  maxVisitedCategory: string;
  maxVisitedPage: string;
  fieldStatus: IInterviewFieldStatus[];

  categories: IInterviewCategory[];
  currentCategoryPages: IInterviewCategoryPage[];
  currentPageFields: IInterviewField[];

  form: FormGroup;
}


export class InterviewInstance implements IInterviewInstance {
  id: string;

  config: IInterviewConfig;

  currentCategory: string;
  currentPage: string;
  maxVisitedCategory: string;
  maxVisitedPage: string;
  fieldStatus: IPersistedInterviewFieldStatus[];

  categories: IInterviewCategory[];
  currentCategoryPages: IInterviewCategoryPage[];
  currentPageFields: IInterviewField[];

  form: FormGroup;


  constructor(input: Partial<IInterviewInstance>) {
    Object.assign(this, input);

    this.form = new FormGroup({
    });
  }
}

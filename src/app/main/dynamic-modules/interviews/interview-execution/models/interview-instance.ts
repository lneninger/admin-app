import { FormGroup } from '@angular/forms';
import { FormFields, IInterviewField } from './interview-field';
import { IInterviewCategory } from './interview-category';
import { IInterviewCategoryPage } from './interview-page';
import { IInterviewConfig } from './interview.config';
import { IInterviewFieldStatus, IPersistedInterviewFieldStatus } from './executing-interview';
import { MatFormFieldDefaultOptions } from '@angular/material/form-field';

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

  formFields: FormFields;


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

  formFields: FormFields;

  constructor(input: Partial<IInterviewInstance>) {
    Object.assign(this, input);

    this.formFields = new FormFields(this);
  }



}



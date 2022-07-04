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

  form: FormGroup;

  formatFormField(name: string);

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
  formFields: FormFields;

  constructor(input: Partial<IInterviewInstance>) {
    Object.assign(this, input);

    this.form = new FormGroup({
    });

    this.formFields = new FormFields();
  }

  formatFormField(name: string) {
    const formField = this.currentPageFields.find(item => item.name === name);
    const fieldStatus = this.fieldStatus.find(item => item.name === name);
    this.formFields.formatFormField(this, formField, fieldStatus);
  }

}



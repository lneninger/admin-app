import { FormFields } from '../controls/_form-fields';
import { IInterviewInstance } from './interfaces/interface-interview-instance';
import { IInterviewConfig } from './interview.config';
import { IInterviewField } from './interfaces/interface-interview-field';
import { IInterviewCategory, IInterviewPage } from './interfaces/interface-interview-category';


export class InterviewInstance implements IInterviewInstance {
  id: string;

  config: IInterviewConfig;

  currentCategory: string;
  currentPage: string;

  categories: IInterviewCategory[];
  currentCategoryPages: IInterviewPage[];
  currentPageFields: IInterviewField[];

  formFields: FormFields;

  constructor(input: Partial<IInterviewInstance>) {
    Object.assign(this, input);

    this.formFields = new FormFields(this);
  }



}



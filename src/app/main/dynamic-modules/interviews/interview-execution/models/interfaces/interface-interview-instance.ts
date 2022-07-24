import { IInterviewField } from 'functions/src/_services/interviews/models/interview-field';
import { FormFields } from '../../controls/_form-fields';
import { IInterviewConfig } from '../interview.config';
import { IInterviewPage } from './interface-interview-category';
import { IInterviewCategory } from './interface-interview-category-response';

export interface IInterviewInstance {
  id: string;

  config: IInterviewConfig;

  currentCategory: string;
  currentPage: string;

  categories: IInterviewCategory[];
  currentCategoryPages: IInterviewPage[];
  currentPageFields: IInterviewField[];

  formFields: FormFields;


}

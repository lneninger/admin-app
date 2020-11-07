import { CaseModel } from '../case/states/case.models';

export class BaseCategoryStateModel {
  currentCase: CaseModel;
  categoryName: string;

  iconFontSet?: string;
  icon?: string;

}

import { BaseCategoryState } from './../../base-category.state';
import { Injectable } from '@angular/core';
import { Actions, State, StateToken, Store } from '@ngxs/store';
import { LISStateModel } from './lis.models';
import { StateRepository } from '@ngxs-labs/data/decorators';
import { ProductCategoryNames } from 'src/app/main/shared/general.models';
import { CaseService } from '../../../case/case.service';

export const LIS_STATE_NAME = `${ProductCategoryNames.LIS}State`;
export const LIS_STATE_TOKEN = new StateToken<LISStateModel>(LIS_STATE_NAME);

@StateRepository()
@State<LISStateModel>({
  name: LIS_STATE_TOKEN,
  defaults: {
    categoryName: null,
    currentCase: null
  }
})
@Injectable({providedIn: 'root'})
export class LISState extends BaseCategoryState {

  constructor(store: Store, actions$: Actions, caseService: CaseService) {
    super(ProductCategoryNames.LIS, 'fas', 'fa-dollar-sign', store, actions$, caseService);
  }

}

import { Injectable } from '@angular/core';
import { Actions, State, StateToken, Store } from '@ngxs/store';
import { StateRepository } from '@ngxs-labs/data/decorators';
import { CaseService } from '../../case/case.service';
import { ProductCategoryNames } from 'src/app/main/shared/general.models';
import { LISState } from './states/lis.state';
import { LISStateModel } from './states/lis.models';
import { BaseCategoryService } from '../base-category.service';

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
export class LISService  extends BaseCategoryService {

  constructor(repository: LISState, store: Store, actions$: Actions, caseService: CaseService) {
    super(repository, ProductCategoryNames.LIS, 'fas', 'fa-dollar-sign', store, actions$, caseService);
  }

}

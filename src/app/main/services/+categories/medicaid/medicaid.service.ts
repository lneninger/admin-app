import { CaseService } from './../../case/case.service';
import { ProductCategoryNames } from './../../../shared/general.models';
import { Injectable } from '@angular/core';
import { Actions, State, StateToken, Store } from '@ngxs/store';
import { BaseCategoryState } from '../base-category.service';
import { MedicaidStateModel } from './medicaid.models';

export const MEDICAID_STATE_NAME = `${ProductCategoryNames.Medicaid}State`;
export const MEDICAID_STATE_TOKEN = new StateToken<MedicaidStateModel>(MEDICAID_STATE_NAME);

@State<MedicaidStateModel>({
  name: MEDICAID_STATE_TOKEN,
  defaults: {
    categoryName: null,
    currentCase: null
  }
})
@Injectable()
export class MedicaidService extends BaseCategoryState {

  constructor(store: Store, actions$: Actions, caseService: CaseService) {
    super(ProductCategoryNames.Medicaid, 'far', 'fa-handshake', store, actions$, caseService);
  }

}

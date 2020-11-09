import { Injectable } from '@angular/core';
import { Actions, State, StateToken, Store } from '@ngxs/store';
import { MedicaidStateModel } from './medicaid.models';
import { StateRepository } from '@ngxs-labs/data';
import { ProductCategoryNames } from 'src/app/main/shared/general.models';
import { BaseCategoryState } from '../../base-category.service';
import { CaseService } from '../../../case/case.service';

export const MEDICAID_STATE_NAME = `${ProductCategoryNames.Medicaid}State`;
export const MEDICAID_STATE_TOKEN = new StateToken<MedicaidStateModel>(MEDICAID_STATE_NAME);

@StateRepository()
@State<MedicaidStateModel>({
  name: MEDICAID_STATE_TOKEN,
  defaults: {
    categoryName: null,
    currentCase: null
  }
})
@Injectable()
export class MedicaidState extends BaseCategoryState {

  constructor(store: Store, actions$: Actions, caseService: CaseService) {
    super(ProductCategoryNames.Medicaid, 'far', 'fa-handshake', store, actions$, caseService);
  }

}

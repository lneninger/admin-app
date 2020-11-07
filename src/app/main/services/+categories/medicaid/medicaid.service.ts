import { CaseService } from './../../case/case.service';
import { ProductCategoryNames } from './../../../shared/general.models';
import { Injectable } from '@angular/core';
import { Actions, State, Store } from '@ngxs/store';
import { BaseCategoryState } from '../base-category.service';
import { MedicaidStateModel } from './medicaid.models';



@State<MedicaidStateModel>({
  name: 'medicaidState',
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

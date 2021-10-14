import { CaseService } from './../../case/case.service';
import { ProductCategoryNames } from './../../../shared/general.models';
import { Injectable } from '@angular/core';
import { Actions, State, StateToken, Store } from '@ngxs/store';
import { BaseCategoryService } from '../base-category.service';
import { MedicaidStateModel } from './states/medicaid.models';
import { MedicaidState } from './states/medicaid.state';

export const MEDICAID_STATE_NAME = `${ProductCategoryNames.Medicaid}State`;
export const MEDICAID_STATE_TOKEN = new StateToken<MedicaidStateModel>(MEDICAID_STATE_NAME);


@Injectable({providedIn: 'root'})
export class MedicaidService extends BaseCategoryService {

  constructor(repository: MedicaidState, store: Store, actions$: Actions, caseService: CaseService) {
    super(repository, ProductCategoryNames.Medicaid, 'far', 'fa-handshake', store, actions$, caseService);
  }

}

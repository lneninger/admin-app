import { BaseCategoryStateModel } from './base-category.models';
import { ProductCategoryNames } from 'src/app/main/shared/general.models';
import { MedicaidStateModel } from './medicaid/medicaid.models';
import { Injectable } from '@angular/core';
import { createSelector, State } from '@ngxs/store';
import { BaseCategoryState } from './base-category.service';
import { MedicaidService } from './medicaid/medicaid.service';

@State<any>({
  name: 'categoryOrchestratorState',
  defaults: null
})
@Injectable()
export class CategoryOrchestratorService {
  static specificState(internalCategoryName: string): (state: any, ...states: any[]) => BaseCategoryStateModel {
    return createSelector([MedicaidService], (medicaidState: MedicaidStateModel) => {
      switch (internalCategoryName) {
        case ProductCategoryNames.Medicaid:
          return medicaidState;
      }
    });
  }
}

import { LISStateModel } from './lis/lis.models';
import { BaseCategoryStateModel } from './base-category.models';
import { ProductCategoryNames } from 'src/app/main/shared/general.models';
import { MedicaidStateModel } from './medicaid/medicaid.models';
import { Injectable, Injector, Type } from '@angular/core';
import { createSelector, State } from '@ngxs/store';
import { BaseCategoryState } from './base-category.service';
import { MedicaidService } from './medicaid/medicaid.service';
import { LISService } from './lis/lis.service';

@State<any>({
  name: 'categoryOrchestratorState',
  defaults: null
})
@Injectable({ providedIn: 'root' })
export class CategoryOrchestratorService {


  static specificState(internalCategoryName: string): (state: any, ...states: any[]) => BaseCategoryStateModel {
    return createSelector([MedicaidService, LISService], (medicaidState: MedicaidStateModel, lisState: LISStateModel) => {
      switch (internalCategoryName) {
        case ProductCategoryNames.Medicaid:
          return medicaidState;
        case ProductCategoryNames.LIS:
          return lisState;
      }
    });
  }

  constructor(private injector: Injector) {

  }

  loadCategoryService<T>(token: Type<T>) {
    return this.injector.get(token);
  }

  loadCategoryServiceByName(value: string): BaseCategoryState {
    switch (value) {
      case ProductCategoryNames.Medicaid:
        return this.loadCategoryService(MedicaidService);
      case ProductCategoryNames.LIS:
        return this.loadCategoryService(LISService);
    }
  }



}

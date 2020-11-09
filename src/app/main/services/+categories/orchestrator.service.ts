import { BaseCategoryStateModel } from './base-category.models';
import { ProductCategoryNames } from 'src/app/main/shared/general.models';
import { MedicaidStateModel } from './medicaid/states/medicaid.models';
import { Injectable, Injector, Type } from '@angular/core';
import { createSelector, State } from '@ngxs/store';
import { LISService } from './lis/lis.service';
import { MedicaidService } from './medicaid/medicaid.service';
import { BaseCategoryService } from './base-category.service';

@State<any>({
  name: 'categoryOrchestratorState',
  defaults: null
})
@Injectable({ providedIn: 'root' })
export class CategoryOrchestratorService {

  constructor(private injector: Injector) {

  }

  loadCategoryService<T>(token: Type<T>) {
    return this.injector.get(token);
  }

  loadCategoryServiceByName(value: string): BaseCategoryService {
    switch (value) {
      case ProductCategoryNames.Medicaid:
        return this.loadCategoryService(MedicaidService);
      case ProductCategoryNames.LIS:
        return this.loadCategoryService(LISService);
    }
  }



}

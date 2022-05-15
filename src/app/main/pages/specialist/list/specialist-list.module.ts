import { NgModule } from '@angular/core';
import { LayoutMainCommonModule } from 'src/app/shared/layout/layout-main/layout-main-common/layout-main-common.module';
import { SelectorsModule } from 'src/app/shared/selectors/selectors.module';

import { GridModule } from '../../../../shared/grid/grid.module';
import { SpecialistListRoutingModule } from './specialist-list-routing.module';
import { SpecialistListComponent } from './specialist-list.component';


@NgModule({
  declarations: [SpecialistListComponent],
  imports: [
    SpecialistListRoutingModule,
    LayoutMainCommonModule,
    GridModule,
    SelectorsModule
  ]
})
export class SpecialistListModule { }

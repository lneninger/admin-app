import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SpecialistListRoutingModule } from './specialist-list-routing.module';
import { SpecialistListComponent } from './specialist-list.component';
import { LayoutMainCommonModule } from 'src/app/shared/layout/layout-main/layout-main-common/layout-main-common.module';
import { GridModule } from '../../../../shared/grid/grid.module';
import { SelectorsModule } from 'src/app/shared/selectors/selectors.module';


@NgModule({
  declarations: [SpecialistListComponent],
  imports: [
    CommonModule,
    SpecialistListRoutingModule,
    LayoutMainCommonModule,
    GridModule,
    SelectorsModule
  ]
})
export class SpecialistListModule { }

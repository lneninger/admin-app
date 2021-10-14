import { LayoutMainCommonModule } from '../../../shared/layout/layout-main/layout-main-common/layout-main-common.module';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SpecialistRoutingModule } from './specialist-routing.module';
import { SpecialistComponent } from './specialist.component';
import { OverviewModule } from './components/overview/overview.module';


@NgModule({
  declarations: [SpecialistComponent],
  imports: [
    CommonModule,
    SpecialistRoutingModule,
    LayoutMainCommonModule,

    OverviewModule
  ]
})
export class SpecialistModule { }

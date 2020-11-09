import { LayoutMainCommonModule } from './../../../../shared/layout/layout-main/layout-main-common/layout-main-common.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { MedicaidHeaderComponent } from '../categories/medicaid/header/header.component';
import { MedicaidHeaderModule } from '../categories/medicaid/header/header.module';


@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    LayoutMainCommonModule
  ]
})
export class DashboardModule { }

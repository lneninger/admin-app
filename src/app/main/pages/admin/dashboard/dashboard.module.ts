import { LayoutMainCommonModule } from '../../../../shared/layout/layout-main/layout-main-common/layout-main-common.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { AdminDashboardComponent } from './dashboard.component';


@NgModule({
  declarations: [AdminDashboardComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    LayoutMainCommonModule
  ]
})
export class AdminDashboardModule { }

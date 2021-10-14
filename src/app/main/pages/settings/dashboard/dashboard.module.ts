import { LayoutMainCommonModule } from '../../../../shared/layout/layout-main/layout-main-common/layout-main-common.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingsDashboardRoutingModule } from './dashboard-routing.module';
import { SettingsDashboardComponent } from './dashboard.component';


@NgModule({
  declarations: [SettingsDashboardComponent],
  imports: [
    CommonModule,
    SettingsDashboardRoutingModule,
    LayoutMainCommonModule
  ]
})
export class SettingsDashboardModule { }

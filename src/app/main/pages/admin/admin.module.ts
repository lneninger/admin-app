import { LayoutMainCommonModule } from '../../../shared/layout/layout-main/layout-main-common/layout-main-common.module';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { OverviewModule } from './components/overview/overview.module';


@NgModule({
  declarations: [AdminComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    LayoutMainCommonModule,
    OverviewModule
  ]
})
export class AdminModule { }

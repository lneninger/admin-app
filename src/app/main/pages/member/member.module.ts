import { LayoutMainCommonModule } from './../../../shared/layout/layout-main/layout-main-common/layout-main-common.module';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MemberRoutingModule } from './member-routing.module';
import { MemberComponent } from './member.component';
import { OverviewModule } from './components/overview/overview.module';


@NgModule({
  declarations: [MemberComponent],
  imports: [
    CommonModule,
    MemberRoutingModule,
    LayoutMainCommonModule,
    OverviewModule
  ]
})
export class MemberModule { }

import { LISService } from './../../services/+categories/lis/lis.service';
import { LayoutMainCommonModule } from './../../../shared/layout/layout-main/layout-main-common/layout-main-common.module';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MemberRoutingModule } from './member-routing.module';
import { MemberComponent } from './member.component';
import { OverviewModule } from './components/overview/overview.module';
import { NgxsModule } from '@ngxs/store';
import { environment } from 'src/environments/environment';
import { MedicaidService } from '../../services/+categories/medicaid/medicaid.service';


@NgModule({
  declarations: [MemberComponent],
  imports: [
    CommonModule,
    MemberRoutingModule,
    LayoutMainCommonModule,

    NgxsModule.forFeature([MedicaidService, LISService]),

    OverviewModule
  ]
})
export class MemberModule { }

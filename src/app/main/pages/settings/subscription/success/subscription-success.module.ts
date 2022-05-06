import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { LayoutMainCommonModule } from 'src/app/shared/layout/layout-main/layout-main-common/layout-main-common.module';

import { SettingsSubscriptionSuccessRoutingModule } from './subscription-success-routing.module';
import { SettingsSubscriptionSuccessComponent } from './subscription-success.component';



@NgModule({
  declarations: [SettingsSubscriptionSuccessComponent],
  imports: [
    CommonModule,
    SettingsSubscriptionSuccessRoutingModule,
    LayoutMainCommonModule
  ]
})
export class SettingsSubscriptionSuccessModule { }

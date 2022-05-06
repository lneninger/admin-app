import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { LayoutMainCommonModule } from 'src/app/shared/layout/layout-main/layout-main-common/layout-main-common.module';

import { SettingsSubscriptionFailRoutingModule } from './subscription-fail-routing.module';
import { SettingsSubscriptionFailComponent } from './subscription-fail.component';



@NgModule({
  declarations: [SettingsSubscriptionFailComponent],
  imports: [
    CommonModule,
    SettingsSubscriptionFailRoutingModule,
    LayoutMainCommonModule
  ]
})
export class SettingsSubscriptionFailModule { }

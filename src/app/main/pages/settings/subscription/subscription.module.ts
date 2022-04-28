import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { LayoutMainCommonModule } from '../../../../shared/layout/layout-main/layout-main-common/layout-main-common.module';
import { SettingsSubscriptionRoutingModule } from './subscription-routing.module';
import { SettingsSubscriptionComponent } from './subscription.component';

@NgModule({
  declarations: [SettingsSubscriptionComponent],
  imports: [
    CommonModule,
    SettingsSubscriptionRoutingModule,
    LayoutMainCommonModule
  ]
})
export class SettingsSubscriptionModule { }

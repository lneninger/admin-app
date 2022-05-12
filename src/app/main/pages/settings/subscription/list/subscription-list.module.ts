import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { LayoutMainCommonModule } from 'src/app/shared/layout/layout-main/layout-main-common/layout-main-common.module';

import { SettingsSubscriptionListRoutingModule } from './subscription-list-routing.module';
import { SettingsSubscriptionListComponent } from './subscription-list.component';



@NgModule({
  declarations: [SettingsSubscriptionListComponent],
  imports: [
    CommonModule,
    SettingsSubscriptionListRoutingModule,
    LayoutMainCommonModule
  ]
})
export class SettingsSubscriptionListModule { }

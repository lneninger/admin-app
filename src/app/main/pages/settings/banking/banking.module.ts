import { NgxStripeModule } from 'ngx-stripe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LayoutMainCommonModule } from '../../../../shared/layout/layout-main/layout-main-common/layout-main-common.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingsBankingRoutingModule } from './banking-routing.module';
import { SettingsBankingComponent } from './banking.component';


@NgModule({
  declarations: [SettingsBankingComponent],
  imports: [
    CommonModule,
    SettingsBankingRoutingModule,
    LayoutMainCommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgxStripeModule
  ]
})
export class SettingsBankingModule { }

import { BankAccountModule } from './../../../../shared/payment/bank-account/bank-account.module';
import { NgxStripeModule } from 'ngx-stripe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LayoutMainCommonModule } from '../../../../shared/layout/layout-main/layout-main-common/layout-main-common.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingsSubscriptionRoutingModule } from './subscription-routing.module';
import { SettingsSubscriptionComponent } from './subscription.component';


@NgModule({
  declarations: [SettingsSubscriptionComponent],
  imports: [
    CommonModule,
    SettingsSubscriptionRoutingModule,
    LayoutMainCommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgxStripeModule,
    BankAccountModule,
    BankAccountModule,
  ]
})
export class SettingsSubscriptionModule { }

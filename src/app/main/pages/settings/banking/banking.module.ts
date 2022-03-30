import { PaymentMethodNewModule } from './new/payment-method-new.module';
import { BankAccountModule } from './../../../../shared/payment/bank-account/bank-account.module';
import { NgxStripeModule } from 'ngx-stripe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LayoutMainCommonModule } from '../../../../shared/layout/layout-main/layout-main-common/layout-main-common.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingsBankingRoutingModule } from './banking-routing.module';
import { SettingsBankingComponent } from './banking.component';
import { PaymentMethodListModule } from './list/payment-method-list.module';
import { PaymentUIModule } from 'src/app/shared/payment/ui/payment-ui.module';


@NgModule({
  declarations: [SettingsBankingComponent],
  imports: [
    CommonModule,
    SettingsBankingRoutingModule,
    LayoutMainCommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgxStripeModule,
    BankAccountModule,
    PaymentMethodListModule,
    PaymentMethodNewModule,
    BankAccountModule,
    PaymentUIModule
  ]
})
export class SettingsBankingModule { }

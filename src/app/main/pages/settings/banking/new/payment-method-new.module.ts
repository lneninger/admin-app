import { BankAccountModule } from '../../../../../shared/payment/bank-account/bank-account.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutMainCommonModule } from 'src/app/shared/layout/layout-main/layout-main-common/layout-main-common.module';
import { BankingPaymentMethodDialog, PaymentMethodNewComponent } from './payment-method-new.component';
import { PaymentMethodNewRoutingModule } from './payment-method-new-routing.module';
import { NgxStripeModule } from 'ngx-stripe';
import { PaymentUIModule } from 'src/app/shared/payment/ui/payment-ui.module';


@NgModule({
  declarations: [PaymentMethodNewComponent, BankingPaymentMethodDialog],
  imports: [
    CommonModule,
    PaymentMethodNewRoutingModule,
    LayoutMainCommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgxStripeModule,
    BankAccountModule,
    PaymentUIModule
  ],
  exports: [
    PaymentMethodNewComponent
  ]
})
export class PaymentMethodNewModule { }

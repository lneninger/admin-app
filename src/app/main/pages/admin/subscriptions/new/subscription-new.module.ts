import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxStripeModule } from 'ngx-stripe';
import { LayoutMainCommonModule } from 'src/app/shared/layout/layout-main/layout-main-common/layout-main-common.module';
import { PaymentUIModule } from 'src/app/shared/payment/ui/payment-ui.module';

import { BankAccountModule } from '../../../../../shared/payment/bank-account/bank-account.module';
import { SubscriptionNewRoutingModule } from './subscription-new-routing.module';
import { SubscriptionNewComponent, SubscriptionNewDialog } from './subscription-new.component';


@NgModule({
  declarations: [SubscriptionNewComponent, SubscriptionNewDialog],
  imports: [
    CommonModule,
    SubscriptionNewRoutingModule,
    LayoutMainCommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgxStripeModule,
    BankAccountModule,
    PaymentUIModule
  ],
  exports: [
    SubscriptionNewComponent
  ]
})
export class SubscriptionNewModule { }

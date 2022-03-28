import { RouterOutletModule } from './../../../../shared/layout/layout-main/router-outlet/router-outlet.module';
import { BankAccountModule } from './../../../../shared/payment/bank-account/bank-account.module';
import { NgxStripeModule } from 'ngx-stripe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LayoutMainCommonModule } from '../../../../shared/layout/layout-main/layout-main-common/layout-main-common.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingsSubscriptionRoutingModule } from './subscription-routing.module';
import { SettingsSubscriptionComponent } from './subscription.component';
import { PaymentUIModule } from 'src/app/shared/payment/ui/payment-ui.module';


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
    RouterOutletModule,
    PaymentUIModule
  ]
})
export class SettingsSubscriptionModule { }
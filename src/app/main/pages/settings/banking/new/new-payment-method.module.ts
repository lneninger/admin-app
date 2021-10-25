import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutMainCommonModule } from 'src/app/shared/layout/layout-main/layout-main-common/layout-main-common.module';
import { NewPaymentMethodComponent } from './new-payment-method.component';
import { SettingsRoutingModule } from './new-payment-method-routing.module';
import { NgxStripeModule } from 'ngx-stripe';


@NgModule({
  declarations: [NewPaymentMethodComponent],
  imports: [
    CommonModule,
    SettingsRoutingModule,
    LayoutMainCommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgxStripeModule
  ]
})
export class NewPaymentMethodModule { }

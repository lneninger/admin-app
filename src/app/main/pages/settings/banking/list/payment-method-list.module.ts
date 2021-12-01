import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutMainCommonModule } from 'src/app/shared/layout/layout-main/layout-main-common/layout-main-common.module';
import { PaymentMethodListComponent } from './payment-method-list.component';
import { PaymentMethodListRoutingModule } from './payment-method-list-routing.module';
import { NgxStripeModule } from 'ngx-stripe';


@NgModule({
  declarations: [PaymentMethodListComponent],
  imports: [
    CommonModule,
    PaymentMethodListRoutingModule,
    LayoutMainCommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgxStripeModule
  ],
  exports: [
    PaymentMethodListComponent
  ]
})
export class PaymentMethodListModule { }

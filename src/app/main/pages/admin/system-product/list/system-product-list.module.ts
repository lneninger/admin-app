import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutMainCommonModule } from 'src/app/shared/layout/layout-main/layout-main-common/layout-main-common.module';
import { SystemProductListRoutingModule } from './system-product-list-routing.module';
import { NgxStripeModule } from 'ngx-stripe';
import { SystemProductListComponent } from './system-product-list.component';


@NgModule({
  declarations: [SystemProductListComponent],
  imports: [
    CommonModule,
    SystemProductListRoutingModule,
    LayoutMainCommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgxStripeModule
  ],
  exports: [
    SystemProductListComponent
  ]
})
export class PaymentMethodListModule { }

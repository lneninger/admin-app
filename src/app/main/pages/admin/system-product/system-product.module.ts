import { BankAccountModule } from './../../../../shared/payment/bank-account/bank-account.module';
import { NgxStripeModule } from 'ngx-stripe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LayoutMainCommonModule } from '../../../../shared/layout/layout-main/layout-main-common/layout-main-common.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SystemProductComponent } from './system-product.component';
import { SystemProductRoutingModule } from './system-product-routing.module';
import { SystemProductNewModule } from './new/system-product-new.module';


@NgModule({
  declarations: [SystemProductComponent],
  imports: [
    CommonModule,
    SystemProductRoutingModule,
    LayoutMainCommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgxStripeModule,
    BankAccountModule,
    SystemProductNewModule,
    BankAccountModule
  ]
})
export class SystemProductModule { }

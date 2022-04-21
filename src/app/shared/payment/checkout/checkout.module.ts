import { NgModule } from '@angular/core';
import { LayoutMainCommonModule } from 'src/app/shared/layout/layout-main/layout-main-common/layout-main-common.module';

import { PaymentCheckoutDialogComponent } from './checkout.component';



@NgModule({
  declarations: [
    PaymentCheckoutDialogComponent
  ],
  imports: [
    LayoutMainCommonModule
  ],
  exports: [
    PaymentCheckoutDialogComponent
  ],
})
export class PaymentCheckoutModule { }

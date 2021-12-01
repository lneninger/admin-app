import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PaymentMethodNewComponent } from './payment-method-new.component';

const routes: Routes = [
  {
    path: '',
    component: PaymentMethodNewComponent,
    data: { menu: 'new-payment-method' }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PaymentMethodNewRoutingModule { }

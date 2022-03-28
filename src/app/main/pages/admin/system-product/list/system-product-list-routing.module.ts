import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PaymentMethodListComponent } from './payment-method-list.component';

const routes: Routes = [
  {
    path: '',
    component: PaymentMethodListComponent,
    data: { menu: 'payment-method-list' }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PaymentMethodListRoutingModule { }

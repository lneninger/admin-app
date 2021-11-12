import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NewPaymentMethodComponent } from './new-payment-method.component';

const routes: Routes = [
  {
    path: '',
    component: NewPaymentMethodComponent,
    data: { menu: 'new-payment-method' }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingsRoutingModule { }

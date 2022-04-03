import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SystemProductListComponent } from './system-product-list.component';

const routes: Routes = [
  {
    path: '',
    component: SystemProductListComponent,
    data: { menu: 'payment-method-list' }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SystemProductListRoutingModule { }

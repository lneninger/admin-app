import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SubscriptionEditComponent } from './subscription-edit.component';

const routes: Routes = [
  {
    path: '',
    component: SubscriptionEditComponent,
    data: { menu: 'admin' }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SubscriptionEditRoutingModule { }

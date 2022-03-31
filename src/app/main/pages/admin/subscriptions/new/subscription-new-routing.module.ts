import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SubscriptionNewComponent } from './subscription-new.component';

const routes: Routes = [
  {
    path: '',
    component: SubscriptionNewComponent,
    data: { menu: 'admin' }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SubscriptionNewRoutingModule { }

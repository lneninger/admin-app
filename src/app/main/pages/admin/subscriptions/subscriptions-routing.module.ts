import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdminSubscriptionsComponent } from './subscriptions.component';

const routes: Routes = [
    {
    path: 'ws',
    component: AdminSubscriptionsComponent,
    data: {
      menu: 'ADMIN'
    },
    children:[
      {
        path: 'new',
        loadChildren: () => import('./new/subscription-new.module').then(m => m.SubscriptionNewModule),
        outlet: 'action'
      },
      {
        path: 'edit/:id',
        loadChildren: () => import('./edit/subscription-edit.module').then(m => m.SubscriptionEditModule),
        outlet: 'action'
      }
    ]
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: 'ws'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SubscriptionsRoutingModule { }

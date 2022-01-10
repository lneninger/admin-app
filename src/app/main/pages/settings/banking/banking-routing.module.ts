import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SettingsBankingComponent } from './banking.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'ws'
  },
  {
    path: 'ws',
    component: SettingsBankingComponent,
    data: {
      menu: 'settings'
    },
    children:[
      {
        path: 'new',
        loadChildren: () => import('./new/payment-method-new.module').then(m => m.PaymentMethodNewModule),
        outlet: 'action'
      }
    ]

  },
  {
    path: '**',
    redirectTo: ''
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingsBankingRoutingModule { }

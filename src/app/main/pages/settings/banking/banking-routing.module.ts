import { RouterOutletComponent } from './../../../../shared/layout/layout-main/router-outlet/router-outlet.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NavigationItemIds } from 'src/app/main/main.navigation';

import { SettingsBankingComponent } from './banking.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: SettingsBankingComponent,
    data: {
      menu: 'settings'
    },
    children:[
      {
        path: 'actions',
        component: RouterOutletComponent,
        children:[
          {
            path: 'new',
            loadChildren: () => import('./new/payment-method-new.module').then(m => m.PaymentMethodNewModule),
            outlet: 'actions'
          }
        ]
      },
      {
        path: 'new',
        loadChildren: () => import('./new/payment-method-new.module').then(m => m.PaymentMethodNewModule),
        outlet: 'actions'
      }
    ]

  },
  {
    path: 'new',
    loadChildren: () => import('./new/payment-method-new.module').then(m => m.PaymentMethodNewModule),
    outlet: 'actions'
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

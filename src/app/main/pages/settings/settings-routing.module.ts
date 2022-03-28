import { FullscreenOverlayContainer } from '@angular/cdk/overlay';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SettingsComponent } from './settings.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'ws',
    pathMatch: 'full',
  },
  {
    path: 'ws',
    component: SettingsComponent,
    data: { menu: 'settings' },
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'dashboard'
      },
      {
        path: 'dashboard',
        loadChildren: () => import('./dashboard/dashboard.module').then(m => m.SettingsDashboardModule)
      },
      {
        path: 'banking',
        loadChildren: () => import('./banking/banking.module').then(m => m.SettingsBankingModule)
      },
      {
        path: 'subscription',
        loadChildren: () => import('./subscription/subscription.module').then(m => m.SettingsSubscriptionModule)
      },
      {
        path: '**',
        pathMatch: 'full',
        redirectTo: ''
      }
    ]
  },
  // {
  //   path: 'dashboard',
  //   loadChildren: () => import('./dashboard/dashboard.module').then(m => m.SettingsDashboardModule)
  // },
  // {
  //   path: 'banking',
  //   loadChildren: () => import('./banking/banking.module').then(m => m.SettingsBankingModule)
  // },
  // {
  //   path: '**',
  //   pathMatch: 'full',
  //   redirectTo: ''
  // }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingsRoutingModule { }

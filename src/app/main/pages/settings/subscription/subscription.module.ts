import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LayoutMainCommonModule } from '../../../../shared/layout/layout-main/layout-main-common/layout-main-common.module';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'list',
  },
  {
    path: 'list',
    loadChildren: () => import('./list/subscription-list.module').then(m => m.SettingsSubscriptionListModule)
  },
  {
    path: 'success',
    loadChildren: () => import('./success/subscription-success.module').then(m => m.SettingsSubscriptionSuccessModule)
  },
  {
    path: 'fail',
    loadChildren: () => import('./fail/subscription-fail.module').then(m => m.SettingsSubscriptionFailModule)
  }
]
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    LayoutMainCommonModule
  ]
})
export class SettingsSubscriptionModule { }

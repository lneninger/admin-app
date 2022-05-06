import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SettingsSubscriptionSuccessComponent } from './subscription-success.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'ws'
  },
  {
    path: 'ws',
    component: SettingsSubscriptionSuccessComponent,
    data: {
      menu: 'settings'
    }


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
export class SettingsSubscriptionSuccessRoutingModule { }

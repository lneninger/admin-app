import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SettingsSubscriptionFailComponent } from './subscription-fail.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'ws'
  },
  {
    path: 'ws',
    component: SettingsSubscriptionFailComponent,
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
export class SettingsSubscriptionFailRoutingModule { }

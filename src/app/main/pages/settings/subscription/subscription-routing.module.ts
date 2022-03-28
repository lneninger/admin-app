import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SettingsSubscriptionComponent } from './subscription.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'ws'
  },
  {
    path: 'ws',
    component: SettingsSubscriptionComponent,
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
export class SettingsSubscriptionRoutingModule { }

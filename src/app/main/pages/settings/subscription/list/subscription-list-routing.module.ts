import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SettingsSubscriptionListComponent } from './subscription-list.component';

const routes: Routes = [

  {
    path: '',
    component: SettingsSubscriptionListComponent,
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
export class SettingsSubscriptionListRoutingModule { }

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NavigationItemIds } from 'src/app/main/main.navigation';

import { SettingsDashboardComponent } from './dashboard.component';

const routes: Routes = [
  {
    path: '',
    component: SettingsDashboardComponent,
    data: {
      menu: 'settings'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingsDashboardRoutingModule { }

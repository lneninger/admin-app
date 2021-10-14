import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NavigationItemIds } from 'src/app/main/main.navigation';

import { SettingsBankingComponent } from './banking.component';

const routes: Routes = [
  {
    path: '',
    component: SettingsBankingComponent,
    data: {
      menu: 'settings'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingsBankingRoutingModule { }

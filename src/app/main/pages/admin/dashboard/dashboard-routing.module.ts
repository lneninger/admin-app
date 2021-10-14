import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NavigationItemIds } from 'src/app/main/main.navigation';

import { AdminDashboardComponent } from './dashboard.component';

const routes: Routes = [
  {
    path: '',
    component: AdminDashboardComponent,
    data: {
      menu: 'ADMIN'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }

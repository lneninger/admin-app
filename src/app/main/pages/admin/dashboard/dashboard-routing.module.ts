import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdminDashboardComponent } from './dashboard.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'ws'
  },

  {
    path: 'ws',
    component: AdminDashboardComponent,
    data: {
      menu: 'ADMIN'
    }
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: 'ws'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }

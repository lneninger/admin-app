import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin.component';


const routes: Routes = [

  {
    path: '',
    component: AdminComponent,
    data: { menu: 'admin' },
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'dasboard'
      },
      {
        path: 'dashboard',
        loadChildren: () => import('./dashboard/dashboard.module').then(m => m.AdminDashboardModule)
      },
      {
        path: '**',
        pathMatch: 'full',
        redirectTo: ''
      }
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }

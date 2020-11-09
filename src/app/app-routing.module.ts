import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthenticationGuard } from 'microsoft-adal-angular6';


const routes: Routes = [
  {
    path: 'app',
    canActivate: [AuthenticationGuard],
    loadChildren: () => import('./main/main.module').then(m => m.MainModule)
  },
  {
    path: '**',
    redirectTo: 'app'
  },

  {
    path: 'dashboard',
    loadChildren: () => import('./main/pages/dashboard/dashboard.module').then(m => m.DashboardModule)
  }

];

@NgModule({
  imports: [RouterModule.forRoot(
    routes,
    { enableTracing: true })
  ],
  exports: [RouterModule],
  providers: [AuthenticationGuard]
})
export class AppRoutingModule { }

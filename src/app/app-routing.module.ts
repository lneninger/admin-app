import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: 'app',
    loadChildren: () => import('./main/main.module').then(m => m.MainModule)
  },
  {
    path: '**',
    redirectTo: 'app'
  },
  {
    path: 'member',
    loadChildren: () => import('./main/pages/member/member.module').then(m => m.MemberModule)
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./main/pages/dashboard/dashboard.module').then(m => m.DashboardModule)
  }
  ,
  {
    path: 'settings',
    loadChildren: () => import('./shared/layout/layout-main/options/app-settings/app-settings.module').then(m => m.AppSettingsModule),
    outlet: 'options'
  },
  { path: 'member-list', loadChildren: () => import('./main/pages/member-list/member-list.module').then(m => m.MemberListModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(
    routes,
    { enableTracing: true })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

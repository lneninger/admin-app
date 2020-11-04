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
  },
  { path: 'profile', loadChildren: () => import('./main/pages/member/profile/profile.module').then(m => m.ProfileModule) },
  { path: 'notes', loadChildren: () => import('./main/pages/member/notes/notes.module').then(m => m.NotesModule) },
  { path: 'documents', loadChildren: () => import('./main/pages/member/documents/documents.module').then(m => m.DocumentsModule) }
  // ,
  // {
  //   path: 'settings',
  //   loadChildren: () => import('./shared/layout/layout-main/options/app-settings/app-settings.module').then(m => m.AppSettingsModule),
  //   outlet: 'options'
  // },
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

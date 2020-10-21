import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MainComponent } from './main.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('./pages/about/about.module').then(m => m.AboutModule),
      },
      {
        path: 'member',
        loadChildren: () => import('./pages/member/member.module').then(m => m.MemberModule)
       },
      // {
      //   path: 'settings',
      //   loadChildren: () => import('../shared/layout/layout-main/options/app-settings/app-settings.module').then(m => m.AppSettingsModule),
      //   outlet: 'options'
      // }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }

import { AboutComponent } from './about.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: '',
        component: AboutComponent,
  },
  {
    path: 'app-settings',
    loadChildren: () => import('../../../shared/layout/layout-main/options/app-settings/app-settings.module')
    .then(m => m.AppSettingsModule),
    outlet: 'options'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AboutRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SystemProductComponent } from './system-product.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'ws'
  },
  {
    path: 'ws',
    component: SystemProductComponent,
    data: {
      menu: 'settings'
    },
    children:[
      {
        path: 'new',
        loadChildren: () => import('./new/system-product-new.module').then(m => m.SystemProductNewModule),
        outlet: 'action'
      }
    ]

  },
  {
    path: '**',
    redirectTo: ''
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SystemProductRoutingModule { }

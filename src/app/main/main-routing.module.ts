import { AngularFireAuthGuard, redirectUnauthorizedTo } from '@angular/fire/compat/auth-guard';
import { SecuredModuleGuardService } from './../shared/secured-modules/secured-module-guard.service';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ISecuredModuleReferece } from '../shared/secured-modules/secured-module.models';

import { MainComponent } from './main.component';
import { MainResolveService } from './main.resolve.service';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login']);

const routes: Routes = [
  {
    path: '',
    redirectTo: 'ws',
    pathMatch: 'full',
  },
  {
    path: 'ws',
    component: MainComponent,
    resolve: [MainResolveService],
    canActivate: [AngularFireAuthGuard],
    canActivateChild: [],
    data: { authGuardPipe: redirectUnauthorizedToLogin },
    children: [
      {
        path: '',
        loadChildren: () => import('./pages/dashboard/dashboard.module').then(m => m.DashboardModule),
      },
      {
        path: 'admin',
        loadChildren: () => import('./pages/admin/admin.module').then(m => m.AdminModule),
        data: { menu: 'admin' }
      },
      {
        path: 'settings',
        loadChildren: () => import('./pages/settings/settings.module').then(m => m.SettingsModule),
        data: { menu: 'settings' }
      },
      {
        path: 'about',
        loadChildren: () => import('./pages/about/about.module').then(m => m.AboutModule),
      },
      {
        path: 'quotes',
        loadChildren: () => import('./pages/quote/quote.module').then(m => m.QuoteModule)
      },
      {
        path: 'user-files',
        loadChildren: () => import('./pages/user-files/user-files.module').then(m => m.UserFilesModule)
      },
      {
        path: 'specialists',
        loadChildren: () => import('./pages/specialist/specialist.module').then(m => m.SpecialistModule),
        data: { menu: 'specialist' }
      },
      {
        path: 'products',
        loadChildren: () => import('./pages/product/list/product-list.module').then(m => m.ProductCategoryListModule)
      },
      {
        path: 'product-categories',
        loadChildren: () => import('./pages/product-category/list/product-category-list.module').then(m => m.ProductCategoryListModule)
      },
      {
        path: 'product-categories/:id',
        loadChildren: () => import('./pages/product-category/item/product-category.module').then(m => m.ProductCategoryModule)
      },


      // Secured Modules
      {
        path: 'secured',
        // canActivate: [SecuredModuleGuardService],
        canActivateChild: [SecuredModuleGuardService],
        children: [
          {
            path: 'axie-infinity',
            loadChildren: () => import('./dynamic-modules/axie-infinity/axie-infinity.module').then(m => m.AxieInfinityModule),
            data: { name: 'AXIE-INFINITY' } as ISecuredModuleReferece
          }
        ]

      }

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }

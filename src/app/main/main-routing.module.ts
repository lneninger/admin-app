import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MainComponent } from './main.component';
import { MainResolveService } from './main.resolve.service';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    resolve: [MainResolveService],
    canActivate: [],
    canActivateChild: [],
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
        loadChildren: () => import('./pages/quote/quote.module').then(m => m.QuoteModule),
        data: { menu: 'quote' }
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

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }

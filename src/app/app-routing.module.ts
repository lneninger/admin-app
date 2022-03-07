import { NgModule } from '@angular/core';
import { AngularFireAuthGuard, redirectLoggedInTo, redirectUnauthorizedTo } from '@angular/fire/compat/auth-guard';
import { RouterModule, Routes } from '@angular/router';

import { LayoutEmptyComponent } from './shared/layout/layout-empty/layout-empty.component';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login']);
const redirectLoggedInToApp = () => redirectLoggedInTo(['app']);

const routes: Routes = [
  {
    path: 'app',
    data: { authGuardPipe: redirectUnauthorizedToLogin },
    loadChildren: () => import('./main/main.module').then(m => m.MainModule)
  },

  {
    path: 'login',
    component: LayoutEmptyComponent,
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectLoggedInToApp },
    children: [
      {
        path: '',
        loadChildren: () => import('./main/pages/auth/login/login.module').then(m => m.LoginModule)
      }
    ]
  },
  {
    path: 'signup',
    component: LayoutEmptyComponent,
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectLoggedInToApp },
    children: [
      {
        path: '',
        loadChildren: () => import('./main/pages/auth/signup/signup.module').then(m => m.SignupModule)
      }
    ]
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./main/pages/dashboard/dashboard.module').then(m => m.DashboardModule)
  },



  { path: 'quote-edit', loadChildren: () => import('./main/pages/quote/update/quote-update.module').then(m => m.QuoteEditModule) },
  // { path: 'product-category', loadChildren: () => import('./main/pages/product-category/product-category.module').then(m => m.ProductCategoryModule) },
  {
    path: '**',
    redirectTo: 'app'
  },


];

@NgModule({
  imports: [RouterModule.forRoot(
    routes,
    { enableTracing: true/*, useHash: true*/ })
  ],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }

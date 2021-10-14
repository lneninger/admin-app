import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { QuoteComponent } from './quote.component';
import { QuoteResolveService } from './quote.resolve.service';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./list/quote-list.module').then(m => m.QuoteListModule)
  },
  {
    path: 'new',
    loadChildren: () => import('./new/quote-new.module').then(m => m.QuoteSettingsModule)
  },
  {
    path: ':id',
    component: QuoteComponent,
    resolve: {
      quote: QuoteResolveService
    },
    data: {
      menu: `QUOTE`
    },
    children: [

      {
        path: '',
        loadChildren: () => import('./update/quote-update.module').then(m => m.QuoteEditModule)
      },
      {
        path: 'dashboard',
        loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)
      },
      {
        path: 'profile',
        loadChildren: () => import('./profile/profile.module').then(m => m.ProfileModule)
      },
      {
        path: 'notes',
        loadChildren: () => import('./notes/notes.module').then(m => m.NotesModule)
      },
      {
        path: 'documents',
        loadChildren: () => import('./documents/documents.module').then(m => m.DocumentsModule)
      },
      {
        path: '**',
        pathMatch: 'full',
        redirectTo: ''
      }
    ]
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QuoteRoutingModule { }

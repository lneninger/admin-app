import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SpecialistComponent } from './specialist.component';
import { SpecialistResolveService } from './specialist.resolve.service';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./list/specialist-list.module').then(m => m.SpecialistListModule)
  },
  {
    path: 'new',
    loadChildren: () => import('./new/specialist-new.module').then(m => m.SpecialistSettingsModule)
  },
  {
    path: ':id',
    component: SpecialistComponent,
    resolve: {
      specialist: SpecialistResolveService
    },
    data: {
      menu: `SPECIALIST`
    },
    children: [

      {
        path: '',
        loadChildren: () => import('./update/specialist-update.module').then(m => m.SpecialistEditModule)
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
export class SpecialistRoutingModule { }

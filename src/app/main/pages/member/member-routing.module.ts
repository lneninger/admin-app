import { MemberResolveService } from './member.resolve.service';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TelephonyResolveService } from '../../services/telephony/telephony.resolve.service';

import { MemberComponent } from './member.component';

const routes: Routes = [
  {
    path: ':id',
    component: MemberComponent,
    resolve: {
      memberWrapper: MemberResolveService
    },
    children: [
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
      }
    ]
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MemberRoutingModule { }

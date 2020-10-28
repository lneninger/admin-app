import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MemberSearchComponent } from './member-search.component';

const routes: Routes = [{ path: '', component: MemberSearchComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MemberSearchRoutingModule { }

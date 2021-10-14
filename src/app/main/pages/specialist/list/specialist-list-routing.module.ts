import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SpecialistListComponent } from './specialist-list.component';

const routes: Routes = [{ path: '', component: SpecialistListComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SpecialistListRoutingModule { }

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SpecialistUpdateComponent } from './specialist-update.component';

const routes: Routes = [{ path: '', component: SpecialistUpdateComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SpecialistEditRoutingModule { }

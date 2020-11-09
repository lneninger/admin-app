import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MedicaidComponent } from './medicaid.component';

const routes: Routes = [{ path: '', component: MedicaidComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MedicaidRoutingModule { }

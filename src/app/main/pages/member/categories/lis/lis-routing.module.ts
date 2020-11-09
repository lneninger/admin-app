import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LISComponent } from './lis.component';

const routes: Routes = [{ path: '', component: LISComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LISRoutingModule { }

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { QuoteUpdateComponent } from './quote-update.component';

const routes: Routes = [{ path: '', component: QuoteUpdateComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QuoteEditRoutingModule { }

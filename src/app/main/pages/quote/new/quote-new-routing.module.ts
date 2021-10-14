import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { QuoteSettingsComponent } from './quote-new.component';

const routes: Routes = [
  {
    path: '',
    component: QuoteSettingsComponent,
    data: { menu: 'new-quote' }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingsRoutingModule { }

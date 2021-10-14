import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SpecialistSettingsComponent } from './specialist-new.component';

const routes: Routes = [
  {
    path: '',
    component: SpecialistSettingsComponent,
    data: { menu: 'new-specialist' }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingsRoutingModule { }

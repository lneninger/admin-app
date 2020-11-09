import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MedicaidRoutingModule } from './medicaid-routing.module';
import { MedicaidComponent } from './medicaid.component';


@NgModule({
  declarations: [MedicaidComponent],
  imports: [
    CommonModule,
    MedicaidRoutingModule
  ]
})
export class MedicaidModule { }

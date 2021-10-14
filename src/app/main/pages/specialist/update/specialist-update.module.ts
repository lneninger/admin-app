import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SpecialistEditRoutingModule } from './specialist-update-routing.module';
import { SpecialistUpdateComponent } from './specialist-update.component';
import { LayoutMainCommonModule } from 'src/app/shared/layout/layout-main/layout-main-common/layout-main-common.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [SpecialistUpdateComponent],
  imports: [
    CommonModule,
    SpecialistEditRoutingModule,
    LayoutMainCommonModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class SpecialistEditModule { }

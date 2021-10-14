import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutMainCommonModule } from 'src/app/shared/layout/layout-main/layout-main-common/layout-main-common.module';
import { SpecialistSettingsComponent } from './specialist-new.component';
import { SettingsRoutingModule } from './specialist-new-routing.module';


@NgModule({
  declarations: [SpecialistSettingsComponent],
  imports: [
    CommonModule,
    SettingsRoutingModule,
    LayoutMainCommonModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class SpecialistSettingsModule { }

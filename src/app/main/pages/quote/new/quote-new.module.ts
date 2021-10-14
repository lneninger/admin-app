import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutMainCommonModule } from 'src/app/shared/layout/layout-main/layout-main-common/layout-main-common.module';
import { QuoteSettingsComponent } from './quote-new.component';
import { SettingsRoutingModule } from './quote-new-routing.module';


@NgModule({
  declarations: [QuoteSettingsComponent],
  imports: [
    CommonModule,
    SettingsRoutingModule,
    LayoutMainCommonModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class QuoteSettingsModule { }

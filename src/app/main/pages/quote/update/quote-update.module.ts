import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QuoteEditRoutingModule } from './quote-update-routing.module';
import { QuoteUpdateComponent } from './quote-update.component';
import { LayoutMainCommonModule } from 'src/app/shared/layout/layout-main/layout-main-common/layout-main-common.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [QuoteUpdateComponent],
  imports: [
    CommonModule,
    QuoteEditRoutingModule,
    LayoutMainCommonModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class QuoteEditModule { }

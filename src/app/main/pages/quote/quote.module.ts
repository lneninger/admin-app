import { LayoutMainCommonModule } from '../../../shared/layout/layout-main/layout-main-common/layout-main-common.module';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QuoteRoutingModule } from './quote-routing.module';
import { QuoteComponent } from './quote.component';
import { OverviewModule } from './components/overview/overview.module';


@NgModule({
  declarations: [QuoteComponent],
  imports: [
    CommonModule,
    QuoteRoutingModule,
    LayoutMainCommonModule,

    OverviewModule
  ]
})
export class QuoteModule { }

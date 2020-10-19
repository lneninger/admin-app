import { LayoutMainCommonModule } from './../../../shared/layout/layout-main/layout-main-common/layout-main-common.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AboutComponent } from './about.component';
import { AboutRoutingModule } from './about-routing.module';

@NgModule({
  declarations: [AboutComponent],
  imports: [
    CommonModule,
    LayoutMainCommonModule,
    AboutRoutingModule
  ]
})
export class AboutModule { }

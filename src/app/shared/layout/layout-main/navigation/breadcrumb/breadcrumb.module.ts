import { RouterModule } from '@angular/router';
import { LayoutMainCommonModule } from './../layout-main-common/layout-main-common.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BreadcrumbComponent } from './breadcrumb.component';



@NgModule({
  declarations: [BreadcrumbComponent],
  imports: [
    CommonModule,
    RouterModule,
    LayoutMainCommonModule
  ],
  exports: [BreadcrumbComponent]
})
export class BreadcrumbModule { }

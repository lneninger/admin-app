import { LayoutMainCommonModule } from './../layout-main-common/layout-main-common.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToolbarComponent } from './toolbar.component';
import { FormsModule } from '@angular/forms';
import { ToolbarSearchModule } from './toolbar-search/toolbar-search.module';
import { BreadcrumbModule } from '../navigation/breadcrumb/breadcrumb.module';



@NgModule({
  declarations: [ToolbarComponent],
  imports: [
    CommonModule,
    FormsModule,
    LayoutMainCommonModule,
    BreadcrumbModule,
    ToolbarSearchModule,

  ],
  exports: [ToolbarComponent],

})
export class ToolbarModule {


}

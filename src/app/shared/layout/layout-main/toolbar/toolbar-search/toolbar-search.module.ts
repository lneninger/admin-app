import { RouterModule } from '@angular/router';
import { LayoutMainCommonModule } from './../../layout-main-common/layout-main-common.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToolbarSearchComponent } from './toolbar-search.component';



@NgModule({
  declarations: [ToolbarSearchComponent],
  imports: [
    CommonModule,
    RouterModule,
    LayoutMainCommonModule
  ],
  exports: [ToolbarSearchComponent],
})
export class ToolbarSearchModule { }

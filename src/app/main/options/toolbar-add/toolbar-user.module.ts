import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToolbarAddComponent } from './toolbar-add.component';
import { LayoutMainCommonModule } from 'src/app/shared/layout/layout-main/layout-main-common/layout-main-common.module';



@NgModule({
  declarations: [ToolbarAddComponent],
  imports: [
    CommonModule,
    RouterModule,
    LayoutMainCommonModule
  ],
  exports: [ToolbarAddComponent],
})
export class ToolbarAddModule { }

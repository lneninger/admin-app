import { RouterModule } from '@angular/router';
import { LayoutMainCommonModule } from '../../layout-main-common/layout-main-common.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToolbarUserComponent } from './toolbar-user.component';



@NgModule({
  declarations: [ToolbarUserComponent],
  imports: [
    CommonModule,
    RouterModule,
    LayoutMainCommonModule
  ],
  exports: [ToolbarUserComponent],
})
export class ToolbarUserModule { }

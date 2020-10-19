import { LayoutMainCommonModule } from './../layout-main-common/layout-main-common.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToolbarComponent } from './toolbar.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [ToolbarComponent],
  imports: [
    CommonModule,
    FormsModule,
    LayoutMainCommonModule
  ],
  exports: [ToolbarComponent],

})
export class ToolbarModule {


}

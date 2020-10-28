import { LayoutMainCommonModule } from './../../layout-main-common/layout-main-common.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OptionsWrapperComponent } from './options-wrapper.component';



@NgModule({
  declarations: [OptionsWrapperComponent],
  imports: [
    CommonModule,
    LayoutMainCommonModule
  ],
  exports: [OptionsWrapperComponent],
})
export class OptionsWrapperModule { }

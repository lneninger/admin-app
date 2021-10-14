import { LayoutMainCommonModule } from 'src/app/shared/layout/layout-main/layout-main-common/layout-main-common.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderItemComponent } from './header-item.component';



@NgModule({
  declarations: [HeaderItemComponent],
  imports: [
    CommonModule,
    LayoutMainCommonModule
  ],
  exports: [
    HeaderItemComponent
  ]
})
export class HeaderItemModule { }

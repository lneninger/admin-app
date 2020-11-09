import { LayoutMainCommonModule } from './../../../../../../shared/layout/layout-main/layout-main-common/layout-main-common.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LISHeaderComponent } from './header.component';
import { HeaderItemModule } from '../../../components/header-item/header-item.module';



@NgModule({
  declarations: [LISHeaderComponent],
  imports: [
    CommonModule,
    LayoutMainCommonModule,
    HeaderItemModule
  ],
  exports: [
    LISHeaderComponent
  ]
})
export class LISHeaderModule { }

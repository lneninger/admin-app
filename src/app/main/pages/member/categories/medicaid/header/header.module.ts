import { LayoutMainCommonModule } from './../../../../../../shared/layout/layout-main/layout-main-common/layout-main-common.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MedicaidHeaderComponent } from './header.component';
import { HeaderItemModule } from '../../../components/header-item/header-item.module';



@NgModule({
  declarations: [MedicaidHeaderComponent],
  imports: [
    CommonModule,
    LayoutMainCommonModule,
    HeaderItemModule
  ],
  exports: [
    MedicaidHeaderComponent
  ]
})
export class MedicaidHeaderModule { }

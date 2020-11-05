import { LayoutMainCommonModule } from 'src/app/shared/layout/layout-main/layout-main-common/layout-main-common.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverviewComponent } from './overview.component';



@NgModule({
  declarations: [OverviewComponent],
  imports: [
    CommonModule,
    LayoutMainCommonModule
  ],
  exports: [OverviewComponent]
})
export class OverviewModule { }

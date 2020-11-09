import { LayoutMainCommonModule } from 'src/app/shared/layout/layout-main/layout-main-common/layout-main-common.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverviewComponent } from './overview.component';
import { MedicaidHeaderModule } from '../../categories/medicaid/header/header.module';
import { LISHeaderModule } from '../../categories/lis/header/header.module';



@NgModule({
  declarations: [OverviewComponent],
  imports: [
    CommonModule,
    LayoutMainCommonModule,
    MedicaidHeaderModule,
    LISHeaderModule
  ],
  exports: [OverviewComponent]
})
export class OverviewModule { }

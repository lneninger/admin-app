import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AxieInfinityMainComponent } from './axie-infinity-main/axie-infinity-main.component';
import { LayoutMainCommonModule } from 'src/app/shared/layout/layout-main/layout-main-common/layout-main-common.module';


@NgModule({
  declarations: [AxieInfinityMainComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: AxieInfinityMainComponent
      }
    ]),
    LayoutMainCommonModule

  ]
})
export class AxieInfinityModule { }


import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AppCommonModule } from 'src/app/shared/common/app-common.module';

import { MaterialImportsModule } from './../../material-imports.module';
import { CustomOverlayModule } from './overlay/overlay.module';
import { PageComponent } from './page/page.component';

@NgModule({
  declarations: [PageComponent],
  imports: [
    CommonModule,
    AppCommonModule,
    MaterialImportsModule,


    CustomOverlayModule



  ],
  exports: [
    CommonModule,
    AppCommonModule,
    MaterialImportsModule,
    CustomOverlayModule,

    PageComponent,
  ]
})
export class LayoutMainCommonModule { }

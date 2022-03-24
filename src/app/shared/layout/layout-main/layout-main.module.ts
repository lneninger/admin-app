import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { LayoutMainCommonModule } from './layout-main-common/layout-main-common.module';
import { LayoutMainComponent } from './layout-main.component';
import { MenuModule } from './navigation/menu/menu.module';
import { ToolbarModule } from './toolbar/toolbar.module';



@NgModule({
  declarations: [LayoutMainComponent],
  imports: [
    CommonModule,
    RouterModule,

    LayoutMainCommonModule,

    MenuModule,
    ToolbarModule
  ],
  exports: [LayoutMainComponent, LayoutMainCommonModule]
})
export class LayoutMainModule { }

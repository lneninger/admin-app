import { LayoutMainModule } from './../shared/layout/layout-main/layout-main.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './main.component';
import { MenuModule } from '../shared/layout/layout-main/menu/menu.module';
import { LayoutMainCommonModule } from '../shared/layout/layout-main/layout-main-common/layout-main-common.module';
import { ToolbarModule } from '../shared/layout/layout-main/toolbar/toolbar.module';


@NgModule({
  declarations: [MainComponent],
  imports: [
    CommonModule,
    MainRoutingModule,
    LayoutMainModule,
    MenuModule,
    LayoutMainCommonModule,
    ToolbarModule
  ]
})
export class MainModule { }

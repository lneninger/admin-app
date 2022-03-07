import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { LayoutMainCommonModule } from '../shared/layout/layout-main/layout-main-common/layout-main-common.module';
import { MenuModule } from '../shared/layout/layout-main/navigation/menu/menu.module';
import { LayoutMainModule } from './../shared/layout/layout-main/layout-main.module';
import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './main.component';
import { ToolbarAddModule } from './options/toolbar-add/toolbar-user.module';
import { ToolbarUserModule } from './options/toolbar-user/toolbar-user.module';


@NgModule({
  declarations: [MainComponent],
  imports: [
    CommonModule,
    MainRoutingModule,
    LayoutMainModule,
    MenuModule,
    LayoutMainCommonModule,
    ToolbarUserModule,
    ToolbarAddModule
  ]
})
export class MainModule { }

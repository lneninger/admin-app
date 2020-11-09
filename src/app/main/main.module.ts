import { LayoutMainModule } from './../shared/layout/layout-main/layout-main.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './main.component';
import { LayoutMainCommonModule } from '../shared/layout/layout-main/layout-main-common/layout-main-common.module';
import { ToolbarModule } from '../shared/layout/layout-main/toolbar/toolbar.module';
import { AuthenticationGuard } from 'microsoft-adal-angular6';
import { ToolbarUserModule } from './options/toolbar-user/toolbar-user.module';
import { MenuModule } from '../shared/layout/layout-main/navigation/menu/menu.module';


@NgModule({
  declarations: [MainComponent],
  imports: [
    CommonModule,
    MainRoutingModule,
    LayoutMainModule,
    MenuModule,
    LayoutMainCommonModule,
    ToolbarUserModule
  ],
  providers: [AuthenticationGuard]
})
export class MainModule { }

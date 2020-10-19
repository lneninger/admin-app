import { LayoutMainCommonModule } from './../../layout-main-common/layout-main-common.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppSettingsRoutingModule } from './app-settings-routing.module';
import { AppSettingsComponent } from './app-settings.component';


@NgModule({
  declarations: [AppSettingsComponent],
  imports: [
    CommonModule,
    AppSettingsRoutingModule,
    LayoutMainCommonModule
  ]
})
export class AppSettingsModule { }

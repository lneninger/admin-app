import { LayoutMainCommonModule } from './../../layout-main-common/layout-main-common.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppSettingsRoutingModule } from './app-settings-routing.module';
import { AppSettingsComponent } from './app-settings.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [AppSettingsComponent],
  imports: [
    CommonModule,
    AppSettingsRoutingModule,
    LayoutMainCommonModule,

    FormsModule
  ]
  , entryComponents: [
    AppSettingsComponent
  ]
})
export class AppSettingsModule {

  static entry = AppSettingsComponent;

}

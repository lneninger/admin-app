import { LayoutMainCommonModule } from './../../../shared/layout/layout-main/layout-main-common/layout-main-common.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppSettingsRoutingModule } from './app-settings-routing.module';
import { AppSettingsComponent } from './app-settings.component';
import { FormsModule } from '@angular/forms';
import { OptionsWrapperModule } from '../../../shared/layout/layout-main/options/options-wrapper/options-wrapper.module';
import { LogoutModule } from '../../shared/security/logout/logout.module';


@NgModule({
    declarations: [AppSettingsComponent],
    imports: [
        CommonModule,
        AppSettingsRoutingModule,
        LayoutMainCommonModule,
        FormsModule,
        OptionsWrapperModule,
        LogoutModule
    ]
})
export class AppSettingsModule {

  static entry = AppSettingsComponent;

}

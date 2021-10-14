import { LayoutMainCommonModule } from '../../../shared/layout/layout-main/layout-main-common/layout-main-common.module';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingsRoutingModule } from './settings-routing.module';
import { SettingsComponent } from './settings.component';


@NgModule({
  declarations: [SettingsComponent],
  imports: [
    CommonModule,
    SettingsRoutingModule,
    LayoutMainCommonModule,
  ]
})
export class SettingsModule { }

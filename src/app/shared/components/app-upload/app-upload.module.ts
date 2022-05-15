import { NgModule } from '@angular/core';
import { FilePickerModule } from 'ngx-awesome-uploader';

import { AppCommonModule } from '../../common/app-common.module';
import { AppUploadComponent } from './app-upload.component';

@NgModule({
  declarations: [
    AppUploadComponent
  ],
  imports: [
    AppCommonModule,
    FilePickerModule
  ],
  exports: [
    AppUploadComponent
  ]
})
export class AppUploadModule { }

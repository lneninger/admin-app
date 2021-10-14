import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UploadComponent } from './upload.component';
import { FilePickerModule } from 'ngx-awesome-uploader';
import { UploadConfig } from './upload.models';
import { UploadService, UPLOAD_CONFIG } from './upload.service';


@NgModule({
  declarations: [UploadComponent],
  imports: [
    CommonModule,
    FilePickerModule
  ],
  exports:[
    UploadComponent
  ]
})
export class UploadModule {

  constructor(@Optional() @SkipSelf() parentModule: UploadModule) {
    if (parentModule) {
      throw new Error('UploadModule is already loaded. Please add it in AppModule only.');
    }
  }

  static forRoot(conf?: UploadConfig): ModuleWithProviders<UploadModule> {
    return {
      ngModule: UploadModule,
      providers: [{ provide: UPLOAD_CONFIG, useValue: conf }, UploadService]
    }
  }
}

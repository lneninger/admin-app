import { UploadModule } from './../../../shared/upload/upload.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    UploadModule.forRoot(),
  ],
  exports: [
    UploadModule
  ]
})
export class AppUploadModule { }

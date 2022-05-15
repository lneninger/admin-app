import { BaseComponent } from 'src/app/shared/base.component';
import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { FilePickerAdapter, FilePreviewModel } from 'ngx-awesome-uploader';
import { FirebaseService } from 'src/app/shared/firebase/firebase.service';

import { FirestorageFilePickerAdapter } from './adapters/firestorage-adapter.service';
import { IUploadConfig } from './app-upload.models';

@Component({
  selector: 'app-upload',
  templateUrl: './app-upload.component.html',
  styleUrls: ['./app-upload.component.scss']
})
export class AppUploadComponent extends BaseComponent implements OnInit, AfterViewInit {

  @Input('config')
  uploadConfig: IUploadConfig;

  adapter: FilePickerAdapter;

  constructor(private firebaseService: FirebaseService) {
    super();
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.configureUpload();
    }, 0);

  }
  configureUpload() {
    this.uploadConfig = this.formatUploadConfig(this.uploadConfig);
    this.adapter = new FirestorageFilePickerAdapter(this.firebaseService, this.uploadConfig);

  }
  formatUploadConfig(uploadConfig: IUploadConfig): IUploadConfig {
    const result: IUploadConfig = {};

    if (!uploadConfig.buildFilePath) {
      result.buildFilePath = this.defaultBuildFilePath.bind(this);
    }

    return { ...uploadConfig, ...result } as IUploadConfig;
  }

  defaultBuildFilePath(fileItem: FilePreviewModel): Promise<any> | any {
    throw new Error('It is mandatory provide the mechanism to build the file path');
  }

  uploadSuccess($event){
    console.log(`$event => `, $event);
  }
}

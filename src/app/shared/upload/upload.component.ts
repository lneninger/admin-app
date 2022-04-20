import { UploadService } from './upload.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IAppUploadResponse } from './upload.models';
import { FilePreviewModel } from 'ngx-awesome-uploader';


export const adapterDefault = {

}

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit {

  _adapter: any;

  @Output()
  uploadSuccess = new EventEmitter<IAppUploadResponse>();

  constructor(public service: UploadService) { }

  ngOnInit(): void {
  }


  onUploadSucess($event: FilePreviewModel) {
    const output = {
      originalFileName: $event.fileName,
      storageFilePath: $event.fileName,
      contentType: undefined
    } as IAppUploadResponse;
    this.uploadSuccess.next(output);
  }
}

import { UploadService } from './upload.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IAppUploadResponse } from './upload.models';


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


  onUploadSucess($event: IAppUploadResponse) {
    this.uploadSuccess.next($event);
  }
}

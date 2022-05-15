import { firstValueFrom } from 'rxjs';
import { FilePreviewModel } from 'ngx-awesome-uploader';
import { AuthService } from 'src/app/main/services/user/auth.service';
import { Component, OnInit } from '@angular/core';
import { IUploadConfig } from 'src/app/shared/components/app-upload/app-upload.models';
import { FirebaseService } from 'src/app/shared/firebase/firebase.service';
import { Guid } from 'guid-ts';

@Component({
  selector: 'app-user-files',
  templateUrl: './user-files.component.html',
  styleUrls: ['./user-files.component.scss']
})
export class UserFilesComponent implements OnInit {


  uploadConfig: IUploadConfig = this.buildUploadConfig();
  files: any;
  folders: any;

  constructor(private authService: AuthService, private firebaseService: FirebaseService) {

  }

  async ngOnInit() {
    await this.getFiles();
  }

  buildUploadConfig(): IUploadConfig {
    return {
      buildFilePath: this.buildUploadFilePath.bind(this),
      buildMetadata: this.buildUploadMetadata.bind(this),
      addFileDetails: true
    } as IUploadConfig;
  }

  buildUploadFilePath(fileItem: FilePreviewModel) {
    const newGuid = Guid.newGuid();
    return `${this.authService.user.uid}/unclassified/${newGuid.toString()}_${fileItem.fileName}`;
    // return `${fileItem.fileName}`;
    // not working, aunthenticated condition fail
    // return `firebase-adminsys-20210823.appspot.com/${this.authService.user.uid}/unclassified/${fileItem.fileName}`;
  }

  buildUploadMetadata(fileItem: FilePreviewModel) {
    return {
      userId: this.authService.user.uid,
      userEmail: this.authService.user.email
    };
  }

  async getFiles(base?: string) {
    base = base || `${this.authService.user.uid}/unclassified`;
    const result = await firstValueFrom(this.firebaseService.storage.ref(base).list());

     this.folders = result.prefixes;

     const files = [];
     for(const file of result.items){
      files.push(await file.getDownloadURL());
     }

     this.files = files;

  }

  async onChange($event: any) {
    await this.getFiles();
  }

}

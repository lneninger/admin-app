import { EventEmitter } from '@angular/core';
import { FilePickerAdapter, FilePreviewModel, UploadResponse, UploadStatus } from 'ngx-awesome-uploader';
import { combineLatest, map, Observable, takeUntil } from 'rxjs';
import { FirebaseService } from 'src/app/shared/firebase/firebase.service';
import { IUploadConfig } from '../app-upload.models';

export class FirestorageFilePickerAdapter extends FilePickerAdapter {

  uploadEnds$ = new EventEmitter<boolean>();

  constructor(private firebaseService: FirebaseService, private config: IUploadConfig) {
    super();
  }
  public uploadFile(fileItem: FilePreviewModel,): Observable<UploadResponse> {

    const filePath = this.getFilePath(fileItem);
    const ref = this.firebaseService.storage.ref(filePath);
    const metadata = this.getMetadata(fileItem);

    const task = ref.put(fileItem.file, metadata);

    //catch is ot error but status
    const status = task.catch(error => error);

    return new Observable(observer => {

      combineLatest([task.percentageChanges(), status]).pipe(takeUntil(this.uploadEnds$)).subscribe(([progress, status]) => {
        if (status) {
          if (status.state?.toUpperCase() === 'SUCCESS') {
            observer.next({
              status: UploadStatus.UPLOADED,
              progress: progress,
              body: status
            } as UploadResponse);

            observer.complete();
            this.uploadEnds$.next(true);
          } else if (status.state?.toUpperCase() === 'ERROR') {
            observer.next({
              status: UploadStatus.ERROR,
              progress: progress,
              body: status
            } as UploadResponse);

            observer.complete();
            this.uploadEnds$.next(true);
          }


        }

        if (progress) {
          observer.next({
            status: (progress < 100) ? UploadStatus.IN_PROGRESS : UploadStatus.UPLOADED,
            progress: progress
          } as UploadResponse);
        }
      });


    });




  }


  public removeFile(fileItem: FilePreviewModel): Observable<any> {
    const filePath = this.getFilePath(fileItem);
    const ref = this.firebaseService.storage.ref(filePath);
    return ref.delete();
  }

  private getFilePath(fileItem: FilePreviewModel): string {
    return this.config.buildFilePath ? this.config.buildFilePath(fileItem) : '';
  }

  getMetadata(fileItem: FilePreviewModel): any {
    const metadata = this.config.buildMetadata ? this.config.buildMetadata(fileItem) : null;
    const fileDetails = this.config.addFileDetails ? this.getFileDetails(fileItem) : undefined;

    return { ...metadata, ...fileDetails };
  }


  getFileDetails(fileItem: FilePreviewModel): any {
    return {
      originalUploadedFile: undefined,
      originalFileName: fileItem.fileName,
      originalSize: fileItem.file.size,
      type: fileItem.file.type
    };
  }
}

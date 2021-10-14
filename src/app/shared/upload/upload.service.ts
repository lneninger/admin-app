
import { HttpClient, HttpEventType, HttpHeaders, HttpRequest } from '@angular/common/http';
import { EventEmitter, Inject, Injectable, InjectionToken, Injector, Optional } from '@angular/core';
import { FilePickerAdapter, FilePreviewModel, UploadResponse, UploadStatus } from 'ngx-awesome-uploader';
import { Observable } from 'rxjs';
import { defaultThrottleConfig } from 'rxjs/internal/operators/throttle';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { IAppUploadResponse, UploadConfig } from './upload.models';

export const UPLOAD_CONFIG = new InjectionToken<string>('UPLOADCONFIG');

@Injectable({
  providedIn: 'root'
})
export class UploadService extends FilePickerAdapter {
  config: UploadConfig;

  onUploadFinished = new EventEmitter<any>();


  constructor(private http: HttpClient, @Optional() @Inject(UPLOAD_CONFIG) config: UploadConfig) {
    super();
    this.config = config || this.generateDefaultConfig();
  }

  generateDefaultConfig(): UploadConfig {
    return {
      url: environment.uploadUrl
    } as UploadConfig;
  }

  public uploadFile(fileItem: FilePreviewModel): Observable<UploadResponse> {
    const url = `${this.config.url}/quote`;
    const headers = new HttpHeaders()
    .set('enctype', 'multipart/form-data')
    .set('Accept', 'application/json')
    .set('KeepOriginalHeadersKey', 'true');
    // .set('Content-Type', undefined);

    // {
    //   'enctype': 'multipart/form-data',
    //   'Accept': 'application/json',
    //   'Content-Type': undefined,
    // });

    let formData = new FormData();
    formData.append('file', fileItem.file);

    // const req = new HttpRequest("POST", url, formData, { reportProgress: true, responseType: 'json' });
    // return this.http.request(req).pipe(map(event => {
    return this.http.post(url, formData, { headers, reportProgress: true, observe: 'events', responseType: 'json' }).pipe(map(event => {
      if (event.type === HttpEventType.UploadProgress)
        return {
          body: null,
          status: UploadStatus.IN_PROGRESS,
          progress: Math.round(100 * event.loaded / event.total)
        } as UploadResponse;
      else if (event.type === HttpEventType.Response) {

        this.onUploadFinished.emit(event.body as IAppUploadResponse);
        return {
          body: event.body,
          status: UploadStatus.UPLOADED,
        } as UploadResponse;
      }
    }));
  }

  public removeFile(fileItem: FilePreviewModel): Observable<any> {
    const url = `${this.config.url}`
    return this.http.delete<UploadResponse>(this.config.url);
  }
}

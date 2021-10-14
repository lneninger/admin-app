
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FilePickerAdapter, FilePreviewModel, UploadResponse } from 'ngx-awesome-uploader';
import { Observable } from 'rxjs';

export interface UploadConfig {
  url: string;
}

export interface IAppUploadResponse {
  originalFileName: string;
  storageFilePath: string;
  contentType: string;
}

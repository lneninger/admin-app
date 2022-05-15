import { FilePreviewModel } from 'ngx-awesome-uploader';

export interface IUploadConfig{
  buildFilePath?: (fileItem: FilePreviewModel) => string;
  buildMetadata?: (fileItem: FilePreviewModel) => Promise<void> | void;
  addFileDetails?: boolean;
  [x: string | number | symbol]: unknown;
}

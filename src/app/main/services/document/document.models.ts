

export interface IDocumentSaveRequest {
  id?: number;
  entityType: string;
  entityId: string;
  originalFileName: string;
  defaultStorageFilePath: string;
  contentType: string;
  metadata: any;
}

export interface IDocumentSaveResponse {
  id?: number;
  entityType: string;
  entityId: string;
  originalFileName: string;
  defaultStorageFilePath: string;
  contentType: string;
  metadata: any;
}

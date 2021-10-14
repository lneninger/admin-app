import { Injectable } from '@angular/core';
import { DocumentEndpointService } from './document-endpoint.service';
import { IDocumentSaveRequest } from './document.models';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {

  constructor(private endpoint: DocumentEndpointService) { }

  save(request: IDocumentSaveRequest) {
    return this.endpoint.save(request);
  }

}

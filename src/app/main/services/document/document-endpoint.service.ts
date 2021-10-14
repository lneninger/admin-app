import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseEndpointService } from '../baseendpoint.service';
import { IDocumentSaveRequest, IDocumentSaveResponse } from './document.models';

@Injectable({
  providedIn: 'root'
})
export class DocumentEndpointService extends BaseEndpointService {

  constructor(private http: HttpClient) {
    super('documents');
  }

  save(request: IDocumentSaveRequest): Observable<IDocumentSaveResponse> {
    const endpointUrl = `${this.baseUrl}`;
    return this.http.post<IDocumentSaveResponse>(endpointUrl, request);
  }

  remove(id: string): Observable<IDocumentSaveResponse> {
    const endpointUrl = `${this.baseUrl}/${id}`;
    return this.http.delete<IDocumentSaveResponse>(endpointUrl);
  }

}

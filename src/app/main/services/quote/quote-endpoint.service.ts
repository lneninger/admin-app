import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { DataRetrieverInput, GridData } from 'src/app/shared/grid/grid-config';
import { BaseEndpointService } from '../baseendpoint.service';
import { AddQuoteRequest, AddQuoteResponse, UpdateQuoteRequest, Quote, UpdateQuoteResponse, IQuoteItem } from './quote.models';

@Injectable({
  providedIn: 'root'
})
export class QuoteEndpointService extends BaseEndpointService {

  constructor(private http: HttpClient) {
    super('quotes');
  }

  search(input: DataRetrieverInput) {
    const url = `${this.baseUrl}/search`;
    return this.http.post<GridData<IQuoteItem>>(url, input);
  }

  add(request: AddQuoteRequest): Observable<AddQuoteResponse> {
    request.type = 'ADD_QUOTE';
    return this.http.post<AddQuoteResponse>(`${this.baseUrl}`, request);
  }

  update(request: UpdateQuoteRequest) {
    request.type = 'UPDATE_QUOTE';
    return this.http.put<UpdateQuoteResponse>(`${this.baseUrl}`, request);
  }

  get(id: string): Observable<Quote> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.get<Quote>(url);
  }
}

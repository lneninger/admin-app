import { StateRepository } from '@ngxs-labs/data/decorators';
import { NgxsBaseDataRepository } from '../+redux/base-redux.service';
import { Injectable } from '@angular/core';
import { AddProductRequest, AddProductResponse, IProduct, IProductItem, ProductStateModel } from './product.models';
import { State } from '@ngxs/store';
import { BaseEndpointService } from '../baseendpoint.service';
import { HttpClient } from '@angular/common/http';
import { DataRetrieverInput, GridData } from 'src/app/shared/grid/grid-config';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ProductCategoryEndpoint extends BaseEndpointService{


  constructor(private http: HttpClient) {
    super('products');
  }

  search(input: DataRetrieverInput) {
    const url = `${this.baseUrl}/search`;
    return this.http.post<GridData<IProductItem>>(url, input);
  }

  add(request: AddProductRequest): Observable<AddProductResponse> {
    const url = `${this.baseUrl}`;
    return this.http.post<AddProductResponse>(url, request);
  }


  get(id: string): Observable<IProduct> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.get<IProduct>(url);
  }

  delete(id: number): Observable<any> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.delete(url);
  }
}

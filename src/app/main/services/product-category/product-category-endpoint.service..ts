import { StateRepository } from '@ngxs-labs/data/decorators';
import { NgxsBaseDataRepository } from './../+redux/base-redux.service';
import { Injectable } from '@angular/core';
import { AddProductCategoryRequest, AddProductCategoryResponse, IProductCategory, IProductCategoryItem, ProductCategoryStateModel } from './product-category.models';
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
    super('productcategories');
  }

  getAll() {
    const url = `${this.baseUrl}`;
    return this.http.get<IProductCategoryItem[]>(url);
  }

  search(input: DataRetrieverInput) {
    const url = `${this.baseUrl}/search`;
    return this.http.post<GridData<IProductCategoryItem>>(url, input);
  }

  add(request: AddProductCategoryRequest): Observable<AddProductCategoryResponse> {
    const url = `${this.baseUrl}`;
    return this.http.post<AddProductCategoryResponse>(url, request);
  }


  get(id: string): Observable<IProductCategory> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.get<IProductCategory>(url);
  }

  delete(id: number): Observable<any> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.delete(url);
  }
}

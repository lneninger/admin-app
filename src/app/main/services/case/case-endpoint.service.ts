import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseEndpointService } from '../baseendpoint.service'
import { CaseModel } from './states/case.models';


@Injectable({
  providedIn: 'root'
})
export class CaseEndpointService extends BaseEndpointService {

  constructor(private http: HttpClient) {
    super('case');
  }

  getCurrent(base64: string, productCategoryName: string) {
    const endpointUrl = `${this.baseUrl}/${base64}/${productCategoryName}/current`;

    return this.http.get<CaseModel>(endpointUrl);
  }

}

import { Injectable } from '@angular/core';
import { stringToKeyValue } from '@angular/flex-layout/extended/typings/style/style-transforms';
import { CaseEndpointService } from './case-endpoint.service';


@Injectable({
  providedIn: 'root'
})
export class CaseService {

  constructor(private endpoint: CaseEndpointService) {

  }

  getCurrent(base64: string, productCategoryName: string) {
    return this.endpoint.getCurrent(base64, productCategoryName);
  }

}

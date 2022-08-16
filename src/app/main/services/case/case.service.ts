import { Injectable } from '@angular/core';
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

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Tenant } from '../../states/tenant/tenant.models';
import { TenantEndpointService } from './tenant-endpoint.service';

@Injectable({
  providedIn: 'root'
})
export class TenantService {

  constructor(private endpoint: TenantEndpointService) {
   }

  get(): Observable<Tenant[]> {
    return this.endpoint.get();
  }


}

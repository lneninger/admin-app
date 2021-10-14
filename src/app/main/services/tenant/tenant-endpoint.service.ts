import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Tenant } from './tenant.models';
import { BaseEndpointService } from '../baseendpoint.service';

@Injectable({
  providedIn: 'root'
})
    export class TenantEndpointService extends  BaseEndpointService{


  constructor(private http: HttpClient) {
    super('tenant');
   }


   get(): Observable<Tenant[]> {
    return this.http.get<Tenant[]>(this.baseUrl);
  }
}

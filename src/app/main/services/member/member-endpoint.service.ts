import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseEndpointService } from '../baseendpoint.service';
import { MemberWrapper } from './states/member.models';

@Injectable({
  providedIn: 'root'
})
    export class MemberEndpointService extends  BaseEndpointService{


  constructor(private http: HttpClient) {
    super('tenant');
   }


   get(base64: string, contextParams: any): Observable<MemberWrapper> {
    return this.http.post<MemberWrapper>(this.baseUrl, contextParams);
  }
}

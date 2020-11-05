import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BaseEndpointService } from '../baseendpoint.service';
import { MemberWrapperModel } from './states/member.models';

@Injectable({
  providedIn: 'root'
})
export class MemberEndpointService extends BaseEndpointService {


  constructor(private http: HttpClient) {
    super('member');
  }


  get(base64: string, contextParams: any): Observable<MemberWrapperModel> {
    const url = `${this.baseUrl}/${base64}`;
    return this.http.post<MemberWrapperModel>(url, contextParams).pipe(map(rawData => new MemberWrapperModel(rawData)));
  }
}

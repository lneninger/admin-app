import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseEndpointService } from '../baseendpoint.service';
import { TelephonySession } from './states/telephony.models';

@Injectable({
  providedIn: 'root'
})
export class TelephonyEndpointService extends BaseEndpointService {


  constructor(private http: HttpClient) {
    super('telephony');
  }


  put(model: TelephonySession): Observable<TelephonySession> {
    return this.http.post<TelephonySession>(this.baseUrl, model);
  }
}

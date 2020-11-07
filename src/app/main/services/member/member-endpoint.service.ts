import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BaseEndpointService } from '../baseendpoint.service';
import { MemberMMRModel, MemberWrapperModel } from './states/member.models';
import { INotification, NotificationWrapper } from './states/notification.models';

@Injectable({
  providedIn: 'root'
})
export class MemberEndpointService extends BaseEndpointService {


  constructor(private http: HttpClient) {
    super('member');
  }


  get(base64: string, contextParams: any): Observable<MemberWrapperModel> {
    const url = `${this.baseUrl}/${base64}`;
    return this.http.post<MemberWrapperModel>(url, contextParams).pipe(map(rawData => new MemberWrapperModel(rawData, base64)));
  }

  getMMR(base64: string): Observable<MemberMMRModel> {
    const url = `${this.baseUrl}/${base64}/mmr`;
    return this.http.get<MemberMMRModel>(url).pipe(map(rawData => new MemberMMRModel(rawData)));
  }

  getNotifications(base64: string): Observable<NotificationWrapper> {
    const url = `${this.baseUrl}/${base64}/notifications`;
    return this.http.get<INotification[]>(url).pipe(map(rawData => new NotificationWrapper(rawData)));
  }

}

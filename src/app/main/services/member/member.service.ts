import { NotificationWrapper } from './states/notification.models';
import { MemberState } from './states/member.state';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MemberEndpointService } from './member-endpoint.service';
import { MemberMMRModel, MemberWrapperModel } from './states/member.models';

@Injectable({
  providedIn: 'root'
})
export class MemberService {

  constructor(private endpoint: MemberEndpointService) { }

  get(base64: string, contextParams: any): Observable<MemberWrapperModel> {
    return this.endpoint.get(base64, contextParams);
  }

  getMMR(base64: string): Observable<MemberMMRModel> {
    return this.endpoint.getMMR(base64);
  }

  getNotifications(base64: string): Observable<NotificationWrapper> {
    return this.endpoint.getNotifications(base64);
  }
}

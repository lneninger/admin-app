import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MemberEndpointService } from './member-endpoint.service';
import { MemberWrapper } from './states/member.models';

@Injectable({
  providedIn: 'root'
})
export class MemberService {

  constructor(private endpoint: MemberEndpointService) { }

  get(base64: string, contextParams: any): Observable<MemberWrapper> {
    return this.endpoint.get(base64, contextParams);
  }
}

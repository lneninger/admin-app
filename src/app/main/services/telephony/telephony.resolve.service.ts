import { MemberStateModel } from '../member/states/member.models';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { ClearMemberAction, GetMemberAction } from '../member/states/member.state';
import { TelephonySessionStateModel } from './states/telephony.models';
import { ProcessTelephonyParamsAction } from './states/telephony.state';

@Injectable({
  providedIn: 'root'
})
export class TelephonyResolveService implements Resolve<TelephonySessionStateModel> {

  constructor(private store: Store) {

  }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> | Promise<any> | any {

    debugger;
    const params = route.params;
    return this.store.dispatch(new ProcessTelephonyParamsAction(params));
  }
}

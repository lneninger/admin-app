import { switchMap, tap } from 'rxjs/operators';
import { MemberStateModel, MemberWrapperModel } from './../../services/member/states/member.models';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Actions, ofActionCompleted, ofActionDispatched, Store } from '@ngxs/store';
import { Observable, combineLatest } from 'rxjs';
import { ClearMemberAction, GetMemberAction } from '../../services/member/states/member.state';
import { ProcessTelephonyParamsAction } from '../../services/telephony/states/telephony.state';
import { AppStateModel } from 'src/app/app.state';

@Injectable({
  providedIn: 'root'
})
export class MemberResolveService implements Resolve<MemberWrapperModel> {

  constructor(private store: Store, private actions$: Actions) {

  }

  async resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ) {


    const params = route.params;

    // return this.store.dispatch(new ProcessTelephonyParamsAction(params));
    await this.store.dispatch(new ProcessTelephonyParamsAction(params)).toPromise();
    const store: AppStateModel = await this.store.dispatch(new GetMemberAction(route.paramMap.get('id'))).toPromise();

    return store.currentMemberState.member;

    // return new Observable(observer => {
    //   this.actions$
    //   .pipe(ofActionCompleted(ProcessTelephonyParamsAction), switchMap(_ => {
    //     debugger;
    //     return this.store.dispatch(new GetMemberAction(route.paramMap.get('id')));
    //   }), tap(data => {
    //     debugger
    //     observer.next(data);
    //   }
    //     ));
    // });

  }
}


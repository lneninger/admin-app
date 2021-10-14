import { first, switchMap, tap } from 'rxjs/operators';
import { MemberStateModel, MemberWrapperModel } from '../../services/member/states/member.models';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Actions, ofActionCompleted, ofActionDispatched, Store } from '@ngxs/store';
import { Observable, combineLatest } from 'rxjs';
import { ClearMemberAction, GetMemberAction } from '../../services/member/states/member.state';
import { ProcessTelephonyParamsAction } from '../../services/telephony/states/telephony.state';
import { AppStateModel } from 'src/app/app.state';
import { Quote } from '../../services/quote/quote.models';
import { QuoteService } from '../../services/quote/quote.service';

@Injectable({
  providedIn: 'root'
})
export class QuoteResolveService implements Resolve<Quote> {

  constructor(private service: QuoteService) {

  }

  async resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ) {


    const params = route.params;

    const itemId = route.paramMap.get('id');
    const quote = await this.service.get(itemId).pipe(first()).toPromise();

    return this.service.setCurrentQuote(quote);

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


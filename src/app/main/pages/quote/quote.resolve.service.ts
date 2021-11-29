import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { first } from 'rxjs/operators';

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


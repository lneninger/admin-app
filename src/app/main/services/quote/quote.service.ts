import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { QuoteEndpointService } from './quote-endpoint.service';
import { AddQuoteRequest, AddQuoteResponse, UpdateQuoteRequest, Quote, QuoteStateModel } from './quote.models';
import { NgxsBaseDataRepository } from '../+redux/base-redux.service';
import { DataAction, Payload, StateRepository } from '@ngxs-labs/data/decorators';
import produce from 'immer';
import { Selector, State, Store } from '@ngxs/store';
import { DataRetrieverInput } from 'src/app/shared/grid/grid-config';


@StateRepository()
@State<QuoteStateModel>({
  name: 'quoteState',
  defaults: {
    currentQuote: null,
  }
})
@Injectable()
export class QuoteService extends NgxsBaseDataRepository<QuoteStateModel>{

  @Selector()
  static currentQuote(state: QuoteStateModel) {
    return state.currentQuote;
  }

  get currentQuote$() {
    return this.store.select<Quote>(QuoteService.currentQuote);
  }

  get currentQuote() {
    return this.store.selectSnapshot<Quote>(QuoteService.currentQuote);
  }

  constructor(
    private endpoint: QuoteEndpointService,
    private store: Store) {
    super();
  }

  search(input: DataRetrieverInput) {
    return this.endpoint.search(input);
  }

  add(request: AddQuoteRequest): Observable<AddQuoteResponse> {
    return this.endpoint.add(request);
  }

  update(request: UpdateQuoteRequest) {
    return this.endpoint.update(request);
  }


  get(id: string): Observable<Quote> {
    return this.endpoint.get(id);
  }

  @DataAction()
  setCurrentQuote(@Payload('quote') quote: Quote) {

    this.ctx.setState(produce(this.ctx.getState(), (draft: QuoteStateModel) => {
      draft.currentQuote = quote;
    }));

    return this.snapshot.currentQuote;
  }
}

import { Injectable } from '@angular/core';
import { DataAction, Payload, StateRepository } from '@ngxs-labs/data/decorators';
import { Selector, State, Store } from '@ngxs/store';
import produce from 'immer';
import { Observable } from 'rxjs';
import { DataRetrieverInput } from 'src/app/shared/grid/grid-config';

import { NgxsBaseDataRepository } from '../+redux/base-redux.service';
import { SpecialistEndpointService } from './specialist-endpoint.service';
import {
  AddSpecialistRequest,
  AddSpecialistResponse,
  Specialist,
  SpecialistStateModel,
  UpdateSpecialistRequest,
} from './specialist.models';


@StateRepository()
@State<SpecialistStateModel>({
  name: 'specialistState',
  defaults: {
    currentSpecialist: null,
  }
})
@Injectable()
export class SpecialistService extends NgxsBaseDataRepository<SpecialistStateModel>{

  @Selector()
  static currentSpecialist(state: SpecialistStateModel) {
    return state.currentSpecialist;
  }

  get currentQuote$() {
    return this.store.select<Specialist>(SpecialistService.currentSpecialist);
  }

  get currentQuote() {
    return this.store.selectSnapshot<Specialist>(SpecialistService.currentSpecialist);
  }

  constructor(
    private endpoint: SpecialistEndpointService,
    private store: Store) {
    super();
  }

  async search(input: DataRetrieverInput) {
    return this.endpoint.search(input);
  }

  async add(request: AddSpecialistRequest) {
    return await this.endpoint.add(request);
  }

  async update(id: string, request: UpdateSpecialistRequest) {

    return await this.endpoint.update(id, request);
  }


  async get(id: string) {
    return await this.endpoint.get(id);
  }

  @DataAction()
  setCurrentSpecialist(@Payload('specialist') input: Specialist) {

    this.ctx.setState(produce(this.ctx.getState(), (draft: SpecialistStateModel) => {
      draft.currentSpecialist = input;
    }));

    return this.snapshot.currentSpecialist;
  }
}

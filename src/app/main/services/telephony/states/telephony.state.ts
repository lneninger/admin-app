import { Injectable } from '@angular/core';
import { Persistence, StateRepository } from '@ngxs-labs/data/decorators';
import { NgxsDataRepository } from '@ngxs-labs/data/repositories';
import { Action, State, StateContext } from '@ngxs/store';
import produce from 'immer';
import { TelephonySessionStateModel, TelephonyStateModel } from './telephony.models';

export class ProcessTelephonyParamsAction {
  static readonly type = `[Telephony] ProcessTelephonyParams`;
  constructor(public payload: any) { }
}


@Persistence()
@StateRepository()
@State<TelephonySessionStateModel>({
  name: 'telephonySessionState',
  defaults: {
    data: null
  }
})
@Injectable()
export class TelephonySessionState extends NgxsDataRepository<TelephonySessionStateModel> {

  constructor() {
    super();
  }

  @Action(ProcessTelephonyParamsAction)
  processTelephonyParams(ctx: StateContext<TelephonySessionStateModel>, action: ProcessTelephonyParamsAction) {

    const state = ctx.getState();
    const inputValues = action.payload;

    // debugger;
    return ctx.setState(produce(ctx.getState(), (draft: TelephonySessionStateModel) => {
      draft.data = inputValues;
    }));
  }
}

@StateRepository()
@State<TelephonyStateModel>({
  name: 'telephonyState',
  defaults: {
  },
  children: [TelephonySessionState]
})
@Injectable()
export class TelephonyState extends NgxsDataRepository<TelephonyStateModel> {

  constructor() {
    super();
  }
}




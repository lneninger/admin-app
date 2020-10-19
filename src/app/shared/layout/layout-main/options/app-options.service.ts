import { Injectable } from '@angular/core';
import { NgxsDataRepository } from '@ngxs-labs/data';
import { Action, Selector, State, StateContext, Store } from '@ngxs/store';
import produce from 'immer';
import { OptionsExpandedToggleAction } from 'src/app/shared/states/appconfig.state';


@Injectable({
  providedIn: 'root'
})
export class AppOptionsService {

  constructor(private store: Store) { }

  toggleOptions(current?: string) {
    this.store.dispatch(new OptionsExpandedToggleAction(current));
  }
}

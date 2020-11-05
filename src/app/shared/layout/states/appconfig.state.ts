import { Injectable } from '@angular/core';
import { State, Selector, Action, Store, StateContext } from '@ngxs/store';
import { Persistence, StateRepository } from '@ngxs-labs/data';
import { NgxsDataRepository } from '@ngxs-labs/data';
import {  } from '@ngxs-labs/data';
import produce from 'immer';

export class MenuToggleAction {
  static readonly type = `[Menu] ToggleAction`;
}

export class MenuExpandedToggleAction {
  static readonly type = `[Menu] ExpandedToggleAction`;

}

export class OptionsExpandedToggleAction {
  static readonly type = `[Options] ExpandedToggleAction`;
  constructor(public option?: string) {

  }
}

// const options: PersistenceProvider[] = [
//   {
//     prefixKey: '@menuapp', // custom prefix
//     path: 'auth', // path to slice
//     existingEngine: localStorage, // storage instance
//     ttl: 60 * 60 * 24 * 1000 // 24 hour for time to live
//   }
// ];

@Persistence()
@StateRepository()
@State<AppConfigStateModel>({
  name: 'configState',
  defaults: {
    menu: {
      show: true,
      expanded: true
    },
    options: {
      expanded: false,
      current: null
    }
  }
})
@Injectable()
export class AppConfigState extends NgxsDataRepository<AppConfigStateModel> {
  @Selector()
  static menu(state: AppConfigStateModel) {
    return state.menu;
  }

  @Selector()
  static options(state: AppConfigStateModel) {
    return state.options;
  }

  @Action(MenuToggleAction)
  menuToggle(ctx: StateContext<AppConfigStateModel>, action: MenuToggleAction) {
    const auth = ctx.setState(produce(ctx.getState(), (draft: AppConfigStateModel) => {
      draft.menu.show = !draft.menu.show;
    }));
  }

  @Action(MenuExpandedToggleAction)
  menuExpandedToggle(ctx: StateContext<AppConfigStateModel>, action: MenuExpandedToggleAction) {
    const auth = ctx.setState(produce(ctx.getState(), (draft: AppConfigStateModel) => {
      draft.menu.expanded = !draft.menu.expanded;
    }));
  }


  @Action(OptionsExpandedToggleAction)
  optionsExpandedToggle(ctx: StateContext<AppConfigStateModel>, action: OptionsExpandedToggleAction) {
    const auth = ctx.setState(produce(ctx.getState(), (draft: AppConfigStateModel) => {
      draft.options = draft.options || {} as AppConfigOptionsModel;
      draft.options.expanded = !draft.options.expanded;
      draft.options.current = action.option || draft.options.current;
    }));
  }
}



export interface AppConfigStateModel {
  menu: AppConfigStateMenuModel;
  options: AppConfigOptionsModel;
}

export interface AppConfigStateMenuModel {
  show: boolean;
  expanded: boolean;
}

export interface AppConfigOptionsModel {
  expanded: boolean;
  current: string;
}

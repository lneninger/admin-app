import { DataAction, Payload, Persistence, StateRepository } from '@angular-ru/ngxs/decorators';
import { NgxsDataRepository } from '@angular-ru/ngxs/repositories';
import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import produce from 'immer';


export enum MenuMode {
  Over = 'over',
  Push = 'push',
  Side = 'side'
}

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
      expanded: true,
      mode: MenuMode.Side
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

  @DataAction()
  setMenuMode(@Payload('mode') payload: MenuMode) {
    this.ctx.setState(produce(this.ctx.getState(), (draft: AppConfigStateModel) => {
      draft.menu.mode = payload;
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
  mode: MenuMode;
  show: boolean;
  expanded: boolean;
}


export interface AppConfigOptionsModel {
  expanded: boolean;
  current: string;
}

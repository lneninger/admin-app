import { UserService } from '../user.service';
import { Injectable } from '@angular/core';
import { State, Selector, Action, Store, StateContext } from '@ngxs/store';
import { Persistence, StateRepository } from '@ngxs-labs/data';
import { NgxsDataRepository } from '@ngxs-labs/data';
import { } from '@ngxs-labs/data';
import produce from 'immer';
import { CurrentRoleStateModel, Role, UserModel, UserStateModel } from './user.models';
import { environment } from 'src/environments/environment';

export class SetUserLoggedAction {
  static readonly type = `[User] Logged`;
  constructor(public payload: any) {
  }
}

export class SetUserTokenAction {
  static readonly type = `[User] UpdateToken`;
  constructor(public payload: string) {
  }
}

export class SetUserCurrentRoleAction {
  static readonly type = `[User] CurrentRole`;
  constructor(public payload: Role) {
  }
}


@Persistence()
@StateRepository()
@State<CurrentRoleStateModel>({
  name: 'app_currentrole',
  defaults: {
    currentRole: null
  }
})
@Injectable()
export class CurrentRoleState extends NgxsDataRepository<CurrentRoleStateModel> {

  constructor(
    private store: Store
  ) {
    super();
  }

  @Action(SetUserCurrentRoleAction)
  async setUserCurrentRole(ctx: StateContext<CurrentRoleStateModel>, action: SetUserCurrentRoleAction) {
    const state = ctx.getState();
    return ctx.setState(produce(ctx.getState(), (draft: CurrentRoleStateModel) => {
      draft.currentRole = action.payload.name;
    }));
  }
}


@StateRepository()
@State<UserStateModel>({
  name: 'app_user',
  defaults: {
    user: null
  },
  children: [CurrentRoleState]
})
@Injectable()
export class UserState extends NgxsDataRepository<UserStateModel> {

  constructor() {
    super();
  }

  @Selector()
  static user(state: UserStateModel) {
    // debugger;
    return state.user;
  }

  @Selector()
  static userRoles(state: UserStateModel) {
    return state.user.roles;
  }

  @Selector()
  static currentRole(state: UserStateModel) {
    // debugger;
    if (!state.app_currentrole.currentRole) {
      return state.app_currentrole.currentRole;
    } else {
      const user = state.user;
      const userRole = user.roles.find(role => role.name === state.app_currentrole.currentRole);

      console.log(`userRole => `, userRole);

      return userRole;

    }
  }

  @Action(SetUserLoggedAction)
  async setUser(ctx: StateContext<UserStateModel>, action: SetUserLoggedAction) {

    const state = ctx.getState();
    return ctx.setState(produce(ctx.getState(), (draft: UserStateModel) => {

      const user = new UserModel();
      user.name = action.payload.profile.name;
      user.userName = action.payload.userName;
      user.email = action.payload.profile.email;
      user.firstName = action.payload.profile.given_name;
      user.lastName = action.payload.profile.family_name;
      user.fullName = `${user.firstName} ${user.lastName}`;
      user.roles = (action.payload.profile.roles as []).map(
        o => new Role(o)
      );

      draft.user = user;

    }));
  }

  @Action(SetUserTokenAction)
  async setUserCurrentRole(ctx: StateContext<UserStateModel>, action: SetUserTokenAction) {
    return ctx.setState(produce(ctx.getState(), (draft: UserStateModel) => {
      draft.token = action.payload;
    }));
  }

}







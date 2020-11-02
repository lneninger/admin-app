import { UserService } from '../user.service';
import { Injectable } from '@angular/core';
import { State, Selector, Action, Store, StateContext } from '@ngxs/store';
import { Persistence, StateRepository } from '@ngxs-labs/data';
import { NgxsDataRepository } from '@ngxs-labs/data';
import { } from '@ngxs-labs/data';
import produce from 'immer';
import { Role, UserModel, UserStateModel } from './user.models';
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


@State<UserStateModel>({
  name: 'app_user',
  defaults: {
    user: null,
    currentRole: null
  }
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
    return state.currentRole;
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
      user.fullName = `${ user.firstName} ${user.lastName}`;
      user.roles = (action.payload.profile.roles as []).map(
          o => new Role(o)
      );

      draft.user = user;

    }));
  }


  @Action(SetUserCurrentRoleAction)
  async setUserCurrentRole(ctx: StateContext<UserStateModel>, action: SetUserCurrentRoleAction) {

    const state = ctx.getState();
    return ctx.setState(produce(ctx.getState(), (draft: UserStateModel) => {
      draft.currentRole = action.payload;
    }));
  }


}




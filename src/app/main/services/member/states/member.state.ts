import { AppStateModel } from 'src/app/app.state';
import { TelephonySession } from './../../telephony/states/telephony.models';
import { MemberService } from './../member.service';
import { Injectable } from '@angular/core';
import { Persistence, StateRepository } from '@ngxs-labs/data';
import { Action, Selector, State, StateContext, Store } from '@ngxs/store';
import produce from 'immer';
import { MemberStateModel } from './member.models';
import { UserModel } from '../../user/states/user.models';
import { tap } from 'rxjs/operators';

export class ClearMemberAction {
  static readonly type = `[Member] ClearMember`;

}

export class SetMemberBase64Action {
  static readonly type = `[Member] SetMemberBase64`;
  constructor(public base64: string) {
  }
}

export class GetMemberAction {
  static readonly type = `[Member] GetMember`;
  constructor(public base64: string, public contextParams?: any) {

  }
}

export class MemberMMRAction {
  static readonly type = `[Member] GetMemberMMR`;
  constructor(public base64: string) {

  }
}

export class MemberNotificationsAction {
  static readonly type = `[Member] GetMemberNotifications`;
  constructor(public base64: string) {

  }
}


@StateRepository()
@State<MemberStateModel>({
  name: 'currentMemberState',
  defaults: {
    base64: null,
    member: null,
    mmr: null,
    notifications: null
  }
})
@Injectable()
export class MemberState {

  @Selector()
  static memberWrapper(state: MemberStateModel) {
    return state.member;
  }

  constructor(private store: Store, private memberService: MemberService) { }

  @Action(ClearMemberAction)
  async clearMember(ctx: StateContext<MemberStateModel>, action: ClearMemberAction) {

    return ctx.setState(produce(ctx.getState(), (draft: MemberStateModel) => {
      draft.member = null;
    }));
  }

  @Action(SetMemberBase64Action)
  async setMemberBase64(ctx: StateContext<MemberStateModel>, action: SetMemberBase64Action) {

    return ctx.setState(produce(ctx.getState(), (draft: MemberStateModel) => {
      draft.base64 = action.base64;
    }));
  }

  @Action(GetMemberAction)
  getMember(ctx: StateContext<MemberStateModel>, action: GetMemberAction) {

    this.store.dispatch(new SetMemberBase64Action(action.base64));

    const telephonySession = this.store.selectSnapshot<TelephonySession>((store: AppStateModel) => store.telephonyState.telephonySessionState.data);

    const user = this.store.selectSnapshot<UserModel>((store: AppStateModel) => store.userState.user);
    const contextParams = {
      user: user && user.email,
      ...telephonySession
    };

    return this.memberService.get(action.base64, contextParams).pipe(tap(state => {
      ctx.setState(produce(ctx.getState(), (draft: MemberStateModel) => {
        draft.member = state;
      }));
    }))
    .pipe(tap(state => {
      this.store.dispatch(new MemberMMRAction(state.member.base64));
      this.store.dispatch(new MemberNotificationsAction(state.member.base64));
    }));
  }


  @Action(MemberMMRAction)
  getMemberMMR(ctx: StateContext<MemberStateModel>, action: MemberMMRAction) {

    return this.memberService.getMMR(action.base64).pipe(tap(state => {
      ctx.setState(produce(ctx.getState(), (draft: MemberStateModel) => {
        draft.mmr = state;
      }));
    }));
  }

  @Action(MemberNotificationsAction)
  getMemberNotifications(ctx: StateContext<MemberStateModel>, action: MemberNotificationsAction) {

    return this.memberService.getNotifications(action.base64).pipe(tap(state => {
      ctx.setState(produce(ctx.getState(), (draft: MemberStateModel) => {
        draft.notifications = state;
      }));
    }));
  }
}

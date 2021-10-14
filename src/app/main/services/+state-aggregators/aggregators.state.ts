import { TenantService } from './../tenant/tenant.service';
import { UserState } from './../user/states/user.state';
import { TenantStateModel } from '../tenant/tenant.models';
import { MemberState } from './../member/states/member.state';
import { Selector, State, Store } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { MemberStateModel } from '../member/states/member.models';
import { AuthStateModel } from '../user/auth.models';


@State<any>({
  name: 'aggregators',
  defaults: null
})
@Injectable()
export class AggregatorsState {

  @Selector([MemberState, TenantService])
  static aggregatorMemberTenant(state: any, member: MemberStateModel, tenant: TenantStateModel) {
    return member && tenant ? { member, tenant } : null;
  }

  @Selector([MemberState, TenantService, UserState])
  static aggregatorMemberTenantUser(state: any, memberState: MemberStateModel, tenantState: TenantStateModel, userState: AuthStateModel) {
    return memberState && tenantState && userState ? { memberState, tenantState, userState } : null;
  }

  constructor(private store: Store) {
  }
}

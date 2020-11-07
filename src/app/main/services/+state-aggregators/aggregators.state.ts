import { TenantStateModel } from './../tenant/states/tenant.models';
import { TenantState } from './../tenant/states/tenant.state';
import { MemberState } from './../member/states/member.state';
import { Selector, State, Store } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { MemberStateModel } from '../member/states/member.models';


@State<any>({
  name: 'aggregators',
  defaults: null
})
@Injectable()
export class AggregatorsState {

  @Selector([MemberState, TenantState])
  static aggregatorMemberTenant(state: any, member: MemberStateModel, tenant: TenantStateModel) {
    return member && tenant ? { member, tenant } : null;
  }

  constructor(private store: Store) { }
}

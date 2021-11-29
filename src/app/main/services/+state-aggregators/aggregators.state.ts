import { UserService } from 'src/app/main/services/user/user.service';
import { TenantService } from './../tenant/tenant.service';
import { TenantStateModel } from '../tenant/tenant.models';
import { Selector, State, Store } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { AuthStateModel } from '../user/auth.models';
import { UserStateModel } from '../user/user.models';


@State<any>({
  name: 'aggregators',
  defaults: null
})
@Injectable()
export class AggregatorsState {

  @Selector([UserService, TenantService])
  static aggregatorMemberTenant(state: any, user: UserStateModel, tenant: TenantStateModel) {
    return user && tenant ? { user, tenant } : null;
  }

  @Selector([UserService, TenantService])
  static aggregatorMemberTenantUser(state: any, userState: UserStateModel, tenantState: TenantStateModel) {
    return userState && tenantState ? { userState, tenantState } : null;
  }

  constructor(private store: Store) {
  }
}

import { TenantService } from '../tenant.service';
import { Injectable } from '@angular/core';
import { State, Selector, Action, Store, StateContext, Actions, ofActionCompleted } from '@ngxs/store';
import { Persistence, StateRepository } from '@ngxs-labs/data';
import { NgxsDataRepository } from '@ngxs-labs/data';
import { } from '@ngxs-labs/data';
import produce from 'immer';
import { Tenant, TenantStateModel } from './tenant.models';
import { environment } from 'src/environments/environment';

export class TenantGetAction {
  static readonly type = `[Tenant] Get`;
}


export class SetDefaultTenantsAction {
  static readonly type = `[Tenant] SetDefaultTenants`;
  constructor(public payload: Tenant[]) { }
}

@Persistence()
@StateRepository()
@State<TenantStateModel>({
  name: 'tenantState',
  defaults: {
    globalTenants: [],
    defaultTenants: []
  }
})
@Injectable()
export class TenantState extends NgxsDataRepository<TenantStateModel> {

  @Selector()
  static globalTenants(state: TenantStateModel) {
    return state.globalTenants;
  }

  @Selector()
  static defaultTenants(state: TenantStateModel) {
    const result = state.globalTenants.filter(item => state.defaultTenants.some(defaultItem => defaultItem === item.tenantName));
    return result;
  }


  constructor(private service: TenantService, private store: Store, private actions$: Actions) {
    super();

    this.store.dispatch(new TenantGetAction());

  }

  @Action(TenantGetAction)
  async tenantGet(ctx: StateContext<TenantStateModel>, action: TenantGetAction) {

    const state = ctx.getState();
    if (environment.useStorage && state?.globalTenants?.length > 0) {
      return state;
    } else {
      const data = await this.service.get().toPromise();


      return ctx.setState(produce(ctx.getState(), (draft: TenantStateModel) => {
        draft.globalTenants = data;
      }));
    }
  }


  @Action(SetDefaultTenantsAction)
  async setDefaultTenants(ctx: StateContext<TenantStateModel>, action: SetDefaultTenantsAction) {

    return ctx.setState(produce(ctx.getState(), (draft: TenantStateModel) => {
      draft.defaultTenants = action.payload ? action.payload.map(item => item.tenantName) : [];
    }));
  }
}




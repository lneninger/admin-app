import { TenantService } from '../tenant.service';
import { Injectable } from '@angular/core';
import { State, Selector, Action, Store, StateContext, Actions, ofActionCompleted } from '@ngxs/store';
import { Persistence, StateRepository } from '@ngxs-labs/data';
import { NgxsDataRepository } from '@ngxs-labs/data';
import { } from '@ngxs-labs/data';
import produce from 'immer';
import { Tenant } from './tenant.models';
import { environment } from 'src/environments/environment';

export class TenantGetAction {
  static readonly type = `[Tenant] Get`;
}

@Persistence()
@StateRepository()
@State<TenantStateModel>({
  name: 'tenantState',
  defaults: {
    globalTenants: []
  }
})
@Injectable()
export class TenantState extends NgxsDataRepository<TenantStateModel> {

  constructor(private service: TenantService, private store: Store, private actions$: Actions) {
    super();

    this.store.dispatch(new TenantGetAction());

  }

  @Selector()
  static tenants(state: TenantStateModel) {
    return state.globalTenants;
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
}



export interface TenantStateModel {
  globalTenants: Tenant[];
}


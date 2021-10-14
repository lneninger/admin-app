import { Injectable } from '@angular/core';
import { DataAction, Payload, StateRepository } from '@ngxs-labs/data/decorators';
import { Observable, BehaviorSubject } from 'rxjs';
import { Tenant, TenantStateModel } from './tenant.models';
import { TenantEndpointService } from './tenant-endpoint.service';
import { Selector, State, Store } from '@ngxs/store';
import { NgxsDataRepository } from '@ngxs-labs/data/repositories';
import { environment } from 'src/environments/environment';
import produce from 'immer';
import { first } from 'rxjs/operators';

@StateRepository()
@State<TenantStateModel>({
  name: 'tenantState',
  defaults: {
    globalTenants: [],
    defaultTenants: []
  }
})
@Injectable()
export class TenantService  extends NgxsDataRepository<TenantStateModel>{
  tenants$ = new BehaviorSubject<Tenant[]>(null);





  @Selector()
  static globalTenants(state: TenantStateModel) {
    return state.globalTenants;
  }

  @Selector()
  static defaultTenants(state: TenantStateModel) {
    const result = state.globalTenants.filter(item => state.defaultTenants.some(defaultItem => defaultItem === item.tenantName));
    return result;
  }

  constructor(private endpoint: TenantEndpointService, private store: Store) {
    super();

   }



  get() {
    return this.endpoint.get();
  }

  @DataAction()
  async tenantGet() {

    const state = this.ctx.getState();
    if (environment.useStorage && state?.globalTenants?.length > 0) {
      return state;
    } else {
      const data = await this.get().toPromise();

      return this.ctx.setState(produce(this.ctx.getState(), (draft: TenantStateModel) => {
        draft.globalTenants = data;
      }));
    }
  }


  @DataAction()
  async setDefaultTenants(@Payload('defaultTenants') payload: Tenant[]) {

    return this.ctx.setState(produce(this.ctx.getState(), (draft: TenantStateModel) => {
      draft.defaultTenants = payload ? payload.map(item => item.tenantName) : [];
    }));
  }

}

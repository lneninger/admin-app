import { TenantGetAction } from './services/tenant/states/tenant.state';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Actions, ofActionCompleted, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { SetUserTokenAction } from './services/user/states/user.state';

@Injectable({
  providedIn: 'root'
})
export class MainResolveService implements  Resolve<any> {

  constructor(private store: Store, private actions$: Actions) {

   }

   async resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<any> {





    return true;
  }
}

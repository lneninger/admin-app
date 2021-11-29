import { AppInitializerService } from './../app-initializer/app-initializer.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { ISecuredModuleReferece as ISecuredModuleReference } from './secured-module.models';

@Injectable({
  providedIn: 'root'
})
export class SecuredModuleGuardService  implements CanActivate, CanActivateChild {
  constructor() {

  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean|UrlTree>|Promise<boolean|UrlTree>|boolean|UrlTree {
    return this.internalCanActivate(route, state);
  }


  canActivateChild(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean|UrlTree>|Promise<boolean|UrlTree>|boolean|UrlTree {
    return this.internalCanActivate(route, state);
  }


  private internalCanActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean|UrlTree>|Promise<boolean|UrlTree>|boolean|UrlTree {
    const ref = route.data as ISecuredModuleReference;
    if(ref && AppInitializerService.configuration && AppInitializerService.configuration.modules){
      return AppInitializerService.configuration.modules.findIndex(item => item.name === ref.name) >= 0;
    }

    return false;
  }
}

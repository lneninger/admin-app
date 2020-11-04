import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, CanLoad, Route, ActivatedRouteSnapshot, RouterStateSnapshot, Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../../services/user.service';
import { ErrorService } from './../error/error-service';
import { IRouteData, RoleList } from 'src/app/models/role';

@Injectable({
    providedIn: 'root'
})
export class AuthorizationGuard implements CanActivate, CanActivateChild, CanLoad {
    constructor(
        private userService: UserService,
        private router: Router,
        private route: ActivatedRoute,
        private errorService: ErrorService
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        return this.checkPermission(route);
    }

    canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        return this.canActivate(route, state);
    }

    canLoad(route: Route): boolean {
        return this.checkPermission(route);
    }

    checkPermission(route: Route | ActivatedRouteSnapshot): boolean {
        const routeData = route.data && (route.data as IRouteData);
        // console.log('this.route.snapshot.routeConfig.data', routeData);
        // routeData && console.log(routeData.title, routeData.allowedRoles);

        const userIsInAllowedRoles = !routeData || !routeData.allowedRoles || routeData.allowedRoles.some(allowedRole => this.userService.isInRole(allowedRole)) || routeData.allowedRoles.some(allowedRole => allowedRole.trim() === '*')

        if (userIsInAllowedRoles || this.userService.isInRole(RoleList.Administrator)) {
            return true;
        }

        this.errorService.error401(routeData.title);

        return false;
    }
}

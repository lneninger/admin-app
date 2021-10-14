import { AppStateModel } from './../../../app.state';
import { UserState } from 'src/app/main/services/user/states/user.state';
import { SetUserLoggedAction, SetUserTokenAction } from './states/user.state';
import { Store } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { MsAdalAngular6Service } from 'microsoft-adal-angular6';
import { RoleNames, UserModel } from './auth.models';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  get isAuthenticated() {
    return true;
    // return this.adalSvc.isAuthenticated;
  }

  private get user() {
    return this.store.selectSnapshot<UserModel>((selector: AppStateModel) => selector.userState.user);
  }

  constructor(
    // private adalSvc: MsAdalAngular6Service,
    private store: Store
  ) {

    // if (this.isAuthenticated) {
    //   // debugger;
    //   this.store.dispatch(new SetUserLoggedAction(this.adalSvc.userInfo));
    //   this.store.dispatch(new SetUserTokenAction(this.adalSvc.accessToken));
    // }

    // this.acquireToken();
  }


  // async acquireToken() {
  //   const token = await this.adalSvc.acquireToken('https://graph.microsoft.com').toPromise();
  //   this.store.dispatch(new SetUserTokenAction(token));
  // }

//  async acquireToken() {
//     const token = await this.account.acquireToken('https://graph.microsoft.com').toPromise();
//     this.store.dispatch(new SetUserTokenAction(token));
//   }

  isInRole(...roles: RoleNames[]): boolean {
    if (this.user != null) {
      return this.user.roles.some(r => r.inRoles(roles));
    }
    return false;
  }

  userInitials(): string {
    if (this.user) {
      return (
        this.user.firstName.charAt(0).toUpperCase() +
        this.user.lastName.charAt(0).toUpperCase()
      );
    }

    return null;
  }

  // logout(): void {
  //   this.adalSvc.logout();
  // }

}

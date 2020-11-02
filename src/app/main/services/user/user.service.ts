import { SetUserLoggedAction, SetUserTokenAction } from './states/user.state';
import { Store } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { MsAdalAngular6Service } from 'microsoft-adal-angular6';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private adalSvc: MsAdalAngular6Service,
    private store: Store
  ) {

    if (this.adalSvc.isAuthenticated) {
      // debugger;
      this.store.dispatch(new SetUserLoggedAction(this.adalSvc.userInfo));
    }

    this.acquireToken();
  }


  async acquireToken() {
    const token = await this.adalSvc.acquireToken('https://graph.microsoft.com').toPromise();
    this.store.dispatch(new SetUserTokenAction(token));
  }

}

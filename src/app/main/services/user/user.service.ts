import { AppStateModel } from './../../../app.state';
import { UserState } from 'src/app/main/services/user/states/user.state';
import { SetUserLoggedAction, SetUserTokenAction } from './states/user.state';
import { Store } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { MsAdalAngular6Service } from 'microsoft-adal-angular6';
import { RoleNames, UserModel } from './auth.models';
import { AngularFireFunctions } from '@angular/fire/functions';
import { IUserCreate } from 'functions/src/user/user.models';

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
    private fns: AngularFireFunctions,
    private store: Store
  ) {
  }

  createUser(user: Partial<IUserCreate>) {
    return this.fns.httpsCallable('userCreate')(user);
  }

}

import { Injectable } from '@angular/core';
import { StateRepository } from '@angular-ru/ngxs/decorators';
import { NgxsDataRepository } from '@angular-ru/ngxs/repositories';
import { State } from '@ngxs/store';
import firebase from 'firebase/app';
import { first } from 'rxjs/operators';
import { FirebaseService } from 'src/app/shared/firebase/firebase.service';

import { AuthStateModel, User, UserLogin } from './auth.models';


export const LoginErrorCodes = {
  TOKEN_EXPIRED: `The user's credential is no longer valid. The user must sign in again.`,
  USER_DISABLED: `The user account has been disabled by an administrator.`,
  USER_NOT_FOUND: `The user corresponding to the refresh token was not found. It is likely the user was deleted.
API key not valid. Please pass a valid API key. (invalid API key provided)`,
  INVALID_REFRESH_TOKEN: `An invalid refresh token is provided.`,
  'Invalid JSON payload received': `Unknown name \"refresh_tokens\": Cannot bind query parameter. Field 'refresh_tokens' could not be found in request message.`,
  INVALID_GRANT_TYPE: `The grant type specified is invalid.`,
  MISSING_REFRESH_TOKEN: `No refresh token provided.`
}

@StateRepository()
@State<AuthStateModel>({
  name: 'authState',
  defaults: {

  }
})
@Injectable()
export class AuthService extends NgxsDataRepository<AuthStateModel> {

  user$ = this.firebaseService.auth.authState;

  constructor(
    private firebaseService: FirebaseService
  ) {
    super();
  }

  async login(userLogin: UserLogin): Promise<firebase.User> {
    try {
      const userCredential = await this.firebaseService.auth.signInWithEmailAndPassword(userLogin.userName, userLogin.password);
      return userCredential.user;
    } catch (error) {
      throw error;
    }
  }

  async loginForProvider(provider: firebase.auth.AuthProvider): Promise<firebase.User> {
    try {
      const userCredential = await this.firebaseService.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
      return userCredential.user;
    } catch (error) {
      throw error;
    }
  }

  async isLoggedIn() {
    return this.firebaseService.auth.authState.pipe(first()).toPromise();
  }

  async logout(): Promise<void> {
    try {
      return await this.firebaseService.auth.signOut();
    } catch (error) {
      throw error;
    }
  }


}

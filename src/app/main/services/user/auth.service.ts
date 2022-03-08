import { DataAction, Payload, Persistence, StateRepository } from '@angular-ru/ngxs/decorators';
import { NgxsDataRepository } from '@angular-ru/ngxs/repositories';
import { Injectable } from '@angular/core';
import { Selector, State, Store } from '@ngxs/store';
import { UserCredential, User as FirebaseUser, AuthProvider, GoogleAuthProvider } from 'firebase/auth';
import { IUserClaims } from 'functions/src/user/user.models';
import produce from 'immer';
import { first } from 'rxjs/operators';
import { FirebaseService } from 'src/app/shared/firebase/firebase.service';

import { AuthStateModel, User, UserLogin } from './auth.models';

// import firebase from 'firebase/app';

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

@Persistence({
  existingEngine: sessionStorage
})
@StateRepository()
@State<AuthStateModel>({
  name: 'authState',
  defaults: {

  }
})
@Injectable()
export class AuthService extends NgxsDataRepository<AuthStateModel> {

  user$ = this.firebaseService.auth.authState;
  // claims: IUserClaims;

  @Selector()
  static credentials(state: AuthStateModel) {
    return state.userCredential;
  }

  @Selector()
  static claims(state: AuthStateModel) {
    return state.claims;
  }

  get claims(){
    return this.store.selectSnapshot<IUserClaims>(AuthService.claims);
  }

  get credentials(){
    return this.store.selectSnapshot<UserCredential>(AuthService.credentials);
  }

  constructor(
    private firebaseService: FirebaseService,
    private store: Store
  ) {
    super();
  }

  async login(userLogin: UserLogin): Promise<FirebaseUser> {
    try {
      const userCredential = await this.firebaseService.auth.signInWithEmailAndPassword(userLogin.userName, userLogin.password);
      await this.setUserCredential(userCredential as unknown as UserCredential);
      return userCredential.user;
    } catch (error) {
      throw error;
    }
  }

  async loginForProvider(provider: AuthProvider): Promise<FirebaseUser> {
    try {
      const userCredential = await this.firebaseService.auth.signInWithPopup(new GoogleAuthProvider());
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

  @DataAction()
  async setUserCredential(@Payload('userCredential') userCredential: UserCredential) {

    const tokenResult = await userCredential.user.getIdTokenResult();
    const claims = tokenResult.claims as unknown as IUserClaims;

    this.ctx.setState(produce(this.ctx.getState(), (draft: AuthStateModel) => {
      draft.userCredential = userCredential;
      draft.claims = claims;
    }));
  }

}

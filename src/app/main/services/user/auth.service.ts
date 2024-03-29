import { DataAction, Payload, Persistence, StateRepository } from '@angular-ru/ngxs/decorators';
import { NgxsDataRepository } from '@angular-ru/ngxs/repositories';
import { Injectable } from '@angular/core';
import { Selector, State, Store } from '@ngxs/store';
import { AuthProvider, GoogleAuthProvider, User as FirebaseUser, UserCredential } from 'firebase/auth';
import { IUserClaims } from 'functions/src/user/user.models';
import produce from 'immer';
import { firstValueFrom, Subscription } from 'rxjs';
import { FirebaseService } from 'src/app/shared/firebase/firebase.service';
import { UtilitiesService } from 'src/app/shared/utilities.service';

import { AuthStateModel, UserLogin, UserModel } from './auth.models';

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
  user$$: Subscription;


  // claims: IUserClaims;

  @Selector()
  static credentials(state: AuthStateModel) {
    return state.userCredential;
  }

  @Selector()
  static user(state: AuthStateModel) {
    return state.user;
  }

  @Selector()
  static claims(state: AuthStateModel) {
    return state.claims;
  }

  get claims() {
    return this.store.selectSnapshot<IUserClaims>(AuthService.claims);
  }
  get credentials$() {
    return this.store.select<UserCredential>(AuthService.credentials);
  }

  get credentials() {
    return this.store.selectSnapshot<UserCredential>(AuthService.credentials);
  }

  get user$() {
    return this.store.select<UserModel>(AuthService.user);
  }

  get user() {
    return this.store.selectSnapshot<UserModel>(AuthService.user);
  }

  constructor(
    private firebaseService: FirebaseService,
    private store: Store
  ) {
    super();
  }

  ngxsAfterBootstrap() {
    this.initializeUserListener();
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

  private initializeUserListener() {
    this.user$$ = this.firebaseService.auth.authState.subscribe(user => {
      if (user) {
        this.setUserCredential(undefined, user);
      }
    });
  }

  async isLoggedIn() {
    return firstValueFrom(this.firebaseService.auth.authState);
  }

  async logout(): Promise<void> {
    try {
      return await this.firebaseService.auth.signOut();
    } catch (error) {
      throw error;
    }
  }

  @DataAction()
  async setUserCredential(@Payload('userCredential') userCredential: UserCredential, @Payload('user') user?: FirebaseUser) {

    user = user || userCredential?.user;

    const tokenResult = await user.getIdTokenResult();
    const claims = UtilitiesService.cloneHard(tokenResult.claims) as unknown as IUserClaims;

    this.ctx.setState(produce(this.ctx.getState(), (draft: AuthStateModel) => {
      draft.userCredential = userCredential;
      // if we use draft.user = user, the mechanism converts user in inmutable and avoid to work the correct wait.
      draft.user = UtilitiesService.cloneHard(user);
      draft.claims = claims;
    }));

    return claims;
  }

}

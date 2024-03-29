import { DataAction, StateRepository } from '@angular-ru/ngxs/decorators';
import { NgxsDataRepository } from '@angular-ru/ngxs/repositories';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Selector, State, Store } from '@ngxs/store';
import { IAttachRole, ISetCurrentRole } from 'functions/src/user/user.models';
import produce from 'immer';
import { firstValueFrom } from 'rxjs';
import { FirebaseService } from 'src/app/shared/firebase/firebase.service';
import { PaymentService } from 'src/app/shared/payment/+services/payment.service';

import { AppStateModel } from './../../../app.state';
import { IUserMetadata, UserModel } from './auth.models';
import { IUserPaymentMetadata, UserStateModel } from './user.models';


@StateRepository()
@State<UserStateModel>({
  name: 'userState',
  defaults: {
    roles: []
  }
})
@Injectable()
export class UserService extends NgxsDataRepository<UserStateModel>{

  @Selector()
  static userRoles(state: UserStateModel) {
    return state.roles;
  }


  @Selector()
  static currentRole(state: UserStateModel) {
    return state.currentRole;
  }

  @Selector()
  static paymentMetadata(state: UserStateModel) {
    return state.paymentMetadata;
  }

  get isAuthenticated() {
    return true;
    // return this.adalSvc.isAuthenticated;
  }
  get user$() {
    return this.store.select<UserModel>((selector: AppStateModel) => selector.authState.user);
  }

  get user() {
    return this.store.selectSnapshot<UserModel>((selector: AppStateModel) => selector.authState.user);
  }

  get paymentMetadata() {
    return this.store.selectSnapshot<IUserPaymentMetadata>(UserService.paymentMetadata);
  }

  get paymentMetadata$() {
    return this.store.select<IUserPaymentMetadata>(UserService.paymentMetadata);
  }

  get paymentId(){
    return this.store.selectSnapshot<string>((state: AppStateModel) => state.authState.claims?.paymentId);
  }

  constructor(
    private firebaseService: FirebaseService,
    private router: Router,
    private store: Store,
    private paymentService: PaymentService
  ) {
    super();
  }

  async ngxsAfterBootstrap() {
    super.ngxsAfterBootstrap();
    await this.getRoles();

    this.firebaseService.auth.authState.subscribe(user => {
      if (user) {
        this.getMetadata();
      }
    });
  }

  @DataAction()
  async getMetadata() {
    const user = await this.firebaseService.auth.currentUser;
    const extraData = (await firstValueFrom(this.firebaseService.firestore.doc(`/entities/${user.uid}`).get())).data() as IUserPaymentMetadata;
    this.ctx.setState(produce(this.ctx.getState(), (draft: UserStateModel) => {
      draft.paymentMetadata = extraData;
    }));

  }

  async createUser(email: string, password: string, phoneNumber: string, photoURL: string, metadata: Partial<IUserMetadata>) {
    // return this.fns.httpsCallable('userCreate')(user);
    let error;
    try {
      const userCreateResponse = await this.firebaseService.auth.createUserWithEmailAndPassword(email, password);
      console.log("You have been successfully registered!");
      console.log(userCreateResponse);
      // if(user.phoneNumber){
      //   userCreateResponse.user.
      //   userCreateResponse.user.phoneNumber = user.phoneNumber;

      //   userCreateResponse.user.updatePhoneNumber(userCreateResponse);
      // }

      try {
        await userCreateResponse.user.updateProfile({ displayName: JSON.stringify(metadata), photoURL: photoURL });

        await userCreateResponse.user.sendEmailVerification() //Send email verification




        await this.firebaseService.auth.signOut() //Logout is triggered --> line 16 in app.js

        return userCreateResponse;

      } catch (error) {
        window.alert(error.message);
        throw error;
      }

    } catch (error) {
      throw error;
    }

  }

  @DataAction()
  async getRoles() {
    const roles = await firstValueFrom(this.firebaseService.firestore.collection('auth-roles').get());
    this.ctx.setState(produce(this.ctx.getState(), (draft: UserStateModel) => {

      // draft.roles = roles as string[];
    }));

    return roles;
  }

  async attachRole(userId: string, roleName: string) {
    const fn = this.firebaseService.fns.httpsCallable('attachRole');
    return await firstValueFrom(fn({ uid: userId, role: roleName } as IAttachRole));
  }

  async setCurentRole(value: string) {
    const fn = this.firebaseService.fns.httpsCallable('setCurrentRole');
    return await firstValueFrom(fn({ name: value } as ISetCurrentRole));
  }


}

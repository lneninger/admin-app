import { DataAction, Persistence, StateRepository } from '@angular-ru/ngxs/decorators';
import { NgxsDataRepository } from '@angular-ru/ngxs/repositories';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Store, State, Selector } from '@ngxs/store';
import { IAttachRole, ISetCurrentRole, IUserMetadata } from 'functions/src/user/user.models';
import produce from 'immer';
import { first } from 'rxjs/operators';
import { FirebaseService } from 'src/app/shared/firebase/firebase.service';
import { PaymentService } from 'src/app/shared/payment/+services/payment.service';

import { AppStateModel } from './../../../app.state';
import { AuthStateModel, Role, UserModel } from './auth.models';
import { UserStateModel } from './user.models';


@StateRepository()
@State<UserStateModel>({
  name: 'userState',
  defaults: {
    roles: []
  }
})
@Injectable()
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

  get isAuthenticated() {
    return true;
    // return this.adalSvc.isAuthenticated;
  }

  get user() {
    return this.store.selectSnapshot<UserModel>((selector: AppStateModel) => selector.userState.user);
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

  async getMetadata() {
    const user = await this.firebaseService.auth.currentUser;
    const extraData = (await this.firebaseService.firestore.doc(`/entities/${user.uid}`).get().pipe(first()).toPromise()).data() as IUserMetadata;
    this.ctx.setState(produce(this.ctx.getState(), (draft: UserStateModel) => {
      draft.userMetadata = extraData;
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


        // create customer in stripe. payment api
        await this.paymentService.setCurrentUserAsCustomer();


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
    const roles = await (await this.firebaseService.firestore.collection('auth-roles').get());
    this.ctx.setState(produce(this.ctx.getState(), (draft: UserStateModel) => {

      // draft.roles = roles as string[];
    }));

    return roles;
  }

  async attachRole(userId: string, roleName: string) {
    const attachRole = this.firebaseService.fns.httpsCallable('attachRole');
    return await attachRole({ uid: userId, role: roleName } as IAttachRole).pipe(first()).toPromise();
  }

  async setCurentRole(value: string) {
    const setCurrentRole = this.firebaseService.fns.httpsCallable('setCurrentRole');
    return await setCurrentRole({ name: value } as ISetCurrentRole).pipe(first()).toPromise();
  }


}

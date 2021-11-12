import { FirebaseService } from 'src/app/shared/firebase/firebase.service';
import { AppStateModel } from './../../../app.state';
import { UserState } from 'src/app/main/services/user/states/user.state';
import { SetUserLoggedAction, SetUserTokenAction } from './states/user.state';
import { Store } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { MsAdalAngular6Service } from 'microsoft-adal-angular6';
import { RoleNames, UserModel } from './auth.models';
import { AngularFireFunctions } from '@angular/fire/functions';
import { IUserMetadata } from 'functions/src/user/user.models';
import { Router } from '@angular/router';

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
    private firebaseService: FirebaseService,
    private router: Router,
    private store: Store
  ) {
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
        this.router.navigate(['/login'])

      } catch (error) {
        window.alert(error.message)
      }

    } catch (error) {
      window.alert(error.message)
    }

  }

  attachRole(userId: string, roleName: string ){
this.firebaseService.fns.httpsCallable('')
  }

}

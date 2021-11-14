import { IUserCreateForm } from './../../main/pages/auth/signup/signup.component';
import { FirebaseService } from 'src/app/shared/firebase/firebase.service';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { UserService } from 'src/app/main/services/user/user.service';
import { IUserMetadata } from 'functions/src/user/user.models';

export const mockedSignUp: IUserCreateForm = {
  email: 'lneninger@hotmail.com',
  password: '123123',
  confirmPassword: '123123',
  displayName: 'Leonardo',
  phoneNumber: '+17864553456',
  photoUrl: environment.uploadUrl,
};

@Injectable({
  providedIn: 'root'
})
export class MockerService {

  constructor(private service: FirebaseService, private userService: UserService) {

    setTimeout(async () => {
      await this.initialize();
    });

  }
  /**
   * Initialize mocked firebase emulator
   */
  async initialize() {
    //#region Auth
    const metadata: IUserMetadata = {
      displayName: mockedSignUp.displayName,
      phoneNumber: mockedSignUp.phoneNumber
    };
    const createUserResult = await this.userService.createUser(mockedSignUp.email, mockedSignUp.password, mockedSignUp.phoneNumber, mockedSignUp.photoUrl, metadata);
    await this.userService.attachRole(createUserResult.user.uid, 'Admin');

    //#endregion
  }
}

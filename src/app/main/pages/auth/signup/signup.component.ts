import { IUserCreate } from './../../../../../../functions/src/user/user.models';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserLogin } from 'src/app/main/services/user/auth.models';
import { AuthService } from 'src/app/main/services/user/auth.service';
import { UserService } from 'src/app/main/services/user/user.service';
import { AlertService, MessageSeverity } from 'src/app/shared/common/alert.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  @ViewChild('signUpForm') public signUpForm: NgForm;
  signUp: IUserCreateForm = {
    email: !environment.production ? 'lneninger@hotmail.com' : undefined,
    password: !environment.production ? '123123' : undefined,
    confirmPassword: !environment.production ? '123123' : undefined,
    displayName: !environment.production ? 'Leonardo' : undefined,
    phoneNumber: !environment.production ? '+17864553456' : undefined,
    photoUrl: !environment.production ? environment.uploadUrl : undefined,
  };

  isLoading = false;
  formResetToggle = true;
  modalClosedCallback: () => void;
  loginStatusSubscription: any;
  @Input()
  isModal = false;

  validationErrors: any;
  signingUp: boolean;
  errorMessage: string;

  constructor(
    private alertService: AlertService,
    private userService: UserService,
    private router: Router
  ) { }

  async ngOnInit() {

  }


  showErrorAlert(caption: string, message: string) {
    this.alertService.showMessage(caption, message, MessageSeverity.error);
  }

  async onSubmit(event: Event) {
    if (this.signUpForm.valid) {

      this.signingUp = true;
      const signUp: IUserCreate = {
        email: this.signUp.email,
        password: this.signUp.password,
        displayName: this.signUp.displayName,
        phoneNumber: this.signUp.phoneNumber,
        photoUrl: this.signUp.photoUrl,
      };

      this.errorMessage = undefined;
      try {
        await this.userService.createUser(signUp).toPromise();
        await this.router.navigate(['/']);
      } catch (error) {
        console.log('login error: ', error);
        this.errorMessage = this.formatErrorMessage(error);
      } finally {
        this.signingUp = false;

      }
    }
  }

  formatErrorMessage({ message }: { message: string }): string {
    return message;
  }

}


export interface IUserCreateForm{
  email: string,
    password: string,
    confirmPassword: string;
    displayName: string,
    phoneNumber: string,
    photoUrl: string,
}

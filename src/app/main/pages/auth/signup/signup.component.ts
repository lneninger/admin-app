import { BaseComponent } from 'src/app/shared/base.component';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { mockedSignUp1 } from 'functions/src/_mocker/mocker.models';
import { IUserMetadata } from 'src/app/main/services/user/auth.models';
import { UserService } from 'src/app/main/services/user/user.service';
import { AlertService, MessageSeverity } from 'src/app/shared/common/alert.service';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent extends BaseComponent implements OnInit {

  @ViewChild('signUpForm') public signUpForm: NgForm;
  signUp: IUserCreateForm = environment.production ? {} as IUserCreateForm : mockedSignUp1;

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
  ) {
    super();
  }

  async ngOnInit() {
  }


  showErrorAlert(caption: string, message: string) {
    this.alertService.showMessage(caption, message, MessageSeverity.error);
  }

  async onSubmit(event: Event) {
    if (this.signUpForm.valid) {

      this.signingUp = true;
      const metadata: IUserMetadata = {
        displayName: this.signUp.displayName,
        phoneNumber: this.signUp.phoneNumber
      };

      this.errorMessage = null;
      try {
        await this.userService.createUser(this.signUp.email, this.signUp.password, this.signUp.phoneNumber, this.signUp.photoUrl, metadata);
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


export interface IUserCreateForm {
  email: string,
  password: string,
  confirmPassword: string;
  displayName: string,
  phoneNumber: string,
  photoUrl?: string,
}

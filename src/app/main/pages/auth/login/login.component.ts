import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserLogin } from 'src/app/main/services/user/auth.models';
import { AuthService } from 'src/app/main/services/user/auth.service';
import { AlertService, MessageSeverity } from 'src/app/shared/common/alert.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  @ViewChild('loginForm') public loginForm: NgForm;
  userLogin = new UserLogin(!environment.production ? 'lneninger@hotmail.com' : undefined, !environment.production ? '123123' : undefined);
  isLoading = false;
  formResetToggle = true;
  modalClosedCallback: () => void;
  loginStatusSubscription: any;
  @Input()
  isModal = false;

  validationErrors: any;
  authenticating: boolean;
  errorMessage: string;

  constructor(
    private alertService: AlertService,
    private authService: AuthService,
    private router: Router
  ) { }

  async ngOnInit() {
    if (await this.authService.isLoggedIn()) {
      await this.router.navigate(['/']);
    }
  }


  showErrorAlert(caption: string, message: string) {
    this.alertService.showMessage(caption, message, MessageSeverity.error);
  }

  async onSubmit(event: Event) {
    if (this.loginForm.valid) {

      this.authenticating = true;
      this.errorMessage = undefined;
      try {
        await this.authService.login(this.userLogin);
        await this.router.navigate(['/']);
      } catch (error) {
        console.log('login error: ', error);
        this.errorMessage = this.formatErrorMessage(error);
      } finally {
        this.authenticating = false;

      }
    }
  }

  formatErrorMessage({ message }: { message: string }): string {
    return message;
  }

}

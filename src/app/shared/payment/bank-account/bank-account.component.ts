import { AppInitializerService } from './../../app-initializer/app-initializer.service';
import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatSelectionListChange } from '@angular/material/list';
import { AuthService } from 'src/app/main/services/user/auth.service';
import { PaymentService } from 'src/app/shared/payment/+services/payment.service';
import { environment } from 'src/environments/environment';

import { IPlaidBankAccount, IPlaidStripeRequestModel, PlaidEvent, PlaidSuccess } from '../+models/plaid';
import {
  IPaymentMethodBankAccountFormModel,
  IPaymentMethodPlaidTokenModel,
  IPaymentMethodRequestModel,
} from '../+services/payment.state.models';


//#region Manual
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
//#endregion

@Component({
  selector: 'app-bank-account',
  templateUrl: './bank-account.component.html',
  styleUrls: ['./bank-account.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BankAccountComponent implements OnInit {

  environment = environment;
  accountData: PlaidSuccess;

  @Input()
  mode: 'Manual' | 'Auto' = 'Auto';


  //#region Auto
  plaidEnvironment: string;
  plaidPublicKey: string;
  selectedAccount: IPlaidBankAccount;

  get accounts() {
    return this.accountData && this.accountData.metadata.accounts;
  }
  //#endregion

  //#region Manual
  form: FormGroup;
  get institutionFormControl() { return this.form.get('institution'); }
  get holderNameFormControl() { return this.form.get('holderName'); }
  get routingNumberFormControl() { return this.form.get('routingNumber'); }
  get accountNumberFormControl() { return this.form.get('accountNumber'); }
  matcher = new MyErrorStateMatcher();
  //#endregion

  constructor(
    private paymentService: PaymentService,
    private authService: AuthService,
    private fmBuilder: FormBuilder
  ) {

    this.plaidEnvironment = AppInitializerService.configuration.plaid.environment;
    this.plaidPublicKey = AppInitializerService.configuration.plaid.publicKey;
  }

  ngOnInit(): void {
  }



  //#region Auto
  onPlaidSuccess($event: PlaidSuccess) {
    this.accountData = $event;
    if (this.accountData.metadata.account) {
      this.selectedAccount = this.accountData.metadata.account;
    }
  }

  onPlaidExit($event: any) {

  }

  onPlaidLoad($event: any) {

  }

  onPlaidEvent($event: PlaidEvent) {

  }

  onPlaidClick($event: any) {

  }
//#endregion

  //#region Manual
  createForm() {
    return this.fmBuilder.group({
      institution: ['', [Validators.required]],
      holderName: ['', [Validators.required]],
      routingNumber: ['', [Validators.required]],
      accountNumber: ['', [Validators.required]],
    });
  }
  //#endregion

  selectAccount($event: MatSelectionListChange){
    const account = $event.options.find(opt => opt.selected)?.value as IPlaidBankAccount;
    this.selectedAccount = account;
  }


  async attachSource(attackToMe: boolean) {
    const req: IPlaidStripeRequestModel = {
      accountId: this.selectedAccount.id,
      publicToken: this.accountData.metadata.public_token,
      customerId: attackToMe ? this.authService.credentials.user.uid : undefined
    };

    await this.paymentService.createBankAccountToken(req);
  }

  async createBankAccount(attachToMe: boolean) {
    if (this.mode === 'Manual') {
      this.createBankAccountManualToken(attachToMe);
    } else if (this.mode === 'Auto') {
      this.createBankAccountPlaidToken(attachToMe);

    }
  }

  private async createBankAccountManualToken(attackToMe: boolean) {
    const req: IPaymentMethodRequestModel = {
      data: this.form.getRawValue() as IPaymentMethodBankAccountFormModel,
      type: 'BankAccountManual',
      uid: attackToMe ? this.authService.credentials.user.uid : undefined
    };

    await this.paymentService.attachBankAccount(req);
  }

  private async createBankAccountPlaidToken(attackToMe: boolean) {
    const req: IPaymentMethodRequestModel = {
      data: {
        accountId: this.selectedAccount.id,
        publicToken: this.accountData.metadata.public_token,
      } as IPaymentMethodPlaidTokenModel,
      type: 'BankAccountPlaidToken',
      uid: attackToMe ? this.authService.credentials.user.uid : undefined
    };

    await this.paymentService.attachBankAccount(req);
  }


  refresh() {
    this.selectedAccount = null;
  }
}

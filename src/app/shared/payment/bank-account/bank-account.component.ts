import { AccessToken } from './../../../main/services/user/access-token.model';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/main/services/user/auth.service';
import { PaymentService } from 'src/app/shared/payment/+services/payment.service';
import { environment } from 'src/environments/environment';
import { threadId } from 'worker_threads';

import { IPlaidBankAccount, IPlaidStripeRequestModel, PlaidEvent, PlaidSuccess } from '../+models/plaid';

@Component({
  selector: 'app-bank-account',
  templateUrl: './bank-account.component.html',
  styleUrls: ['./bank-account.component.scss']
})
export class BankAccountComponent implements OnInit {

  environment = environment;
  accountData: PlaidSuccess;
  plaidEnvironment: string;
  plaidPublicKey: string;
  selectedAccount: IPlaidBankAccount;

  get accounts() {
    return this.accountData && this.accountData.metadata.accounts;
  }

  constructor(
    private paymentService: PaymentService,
    private authService: AuthService
  ) {

    this.plaidEnvironment = environment.plaid.environment;
    this.plaidPublicKey = environment.plaid.publicKey;
  }

  ngOnInit(): void {
  }



  onPlaidSuccess($event: PlaidSuccess) {
    this.accountData = $event;
    if (this.accountData.metadata.account.id) {
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


  async createBankAccount(attackToMe: boolean) {
    const req: IPlaidStripeRequestModel = {
      accountId: this.selectedAccount.id,
      publicToken: this.accountData.metadata.public_token,
      customerId: attackToMe ? this.authService.credentials.user.uid : undefined
    };

    await this.paymentService.createBankAccount(req);
  }
}

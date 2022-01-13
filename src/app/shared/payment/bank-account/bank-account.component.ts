import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/main/services/user/auth.service';
import { PaymentService } from 'src/app/shared/payment/+services/payment.service';
import { environment } from 'src/environments/environment';

import { IPlaidStripeRequestModel, PlaidEvent, PlaidSuccess } from '../+models/plaid';

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
      accountId: this.accountData.metadata.account_id,
      publicToken: this.accountData.metadata.public_token,
      customerId: attackToMe ? this.authService.credentials.user.uid : undefined
    };

    await this.paymentService.createBankAccount(req);
  }
}

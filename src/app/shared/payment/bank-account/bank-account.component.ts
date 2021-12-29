import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { PlaidEvent, PlaidSuccess } from '../+models/plaid';

@Component({
  selector: 'app-bank-account',
  templateUrl: './bank-account.component.html',
  styleUrls: ['./bank-account.component.scss']
})
export class BankAccountComponent implements OnInit {

  environment = environment;
  accountData: PlaidSuccess;

  constructor() { }

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
}

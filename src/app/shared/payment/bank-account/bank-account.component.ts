import { Component, OnInit } from '@angular/core';
import { PlaidEvent, PlaidSuccess } from '../+models/plaid';

@Component({
  selector: 'app-bank-account',
  templateUrl: './bank-account.component.html',
  styleUrls: ['./bank-account.component.scss']
})
export class BankAccountComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }



  onPlaidSuccess($event: PlaidSuccess) {

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

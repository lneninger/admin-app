import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BankAccountComponent } from './bank-account.component';
import { NgxPlaidLinkModule } from 'ngx-plaid-link';



@NgModule({
  declarations: [BankAccountComponent],
  imports: [
    CommonModule,
    NgxPlaidLinkModule,
  ],
  exports: [
    BankAccountComponent
  ]
})
export class BankAccountModule { }

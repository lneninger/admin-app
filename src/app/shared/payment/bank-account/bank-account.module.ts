import { FlexLayoutModule } from '@angular/flex-layout';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BankAccountComponent } from './bank-account.component';
import { NgxPlaidLinkModule } from 'ngx-plaid-link';



@NgModule({
  declarations: [BankAccountComponent],
  imports: [
    CommonModule,
    NgxPlaidLinkModule,
    FlexLayoutModule
  ],
  exports: [
    BankAccountComponent
  ]
})
export class BankAccountModule { }

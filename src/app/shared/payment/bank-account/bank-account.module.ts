import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgxPlaidLinkModule } from 'ngx-plaid-link';
import { LayoutMainCommonModule } from 'src/app/shared/layout/layout-main/layout-main-common/layout-main-common.module';

import { BankAccountComponent } from './bank-account.component';



@NgModule({
  declarations: [BankAccountComponent],
  imports: [
    CommonModule,
    NgxPlaidLinkModule,
    FlexLayoutModule,
    LayoutMainCommonModule,
    FormsModule
  ],
  exports: [
    BankAccountComponent
  ]
})
export class BankAccountModule { }

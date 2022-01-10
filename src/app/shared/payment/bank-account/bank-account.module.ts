import { LayoutMainCommonModule } from 'src/app/shared/layout/layout-main/layout-main-common/layout-main-common.module';
import { AppCommonModule } from 'src/app/shared/common/app-common.module';
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
    FlexLayoutModule,
    LayoutMainCommonModule
  ],
  exports: [
    BankAccountComponent
  ]
})
export class BankAccountModule { }

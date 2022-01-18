import { BankAccountComponent } from './../../../../../shared/payment/bank-account/bank-account.component';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { StripeCardElementOptions, StripeElementsOptions } from '@stripe/stripe-js';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';
import { StripeCardComponent, StripeIdealBankComponent, StripeService } from 'ngx-stripe';
import { NavigationItemIds } from 'src/app/main/main.navigation';
import { ComponentDisplayMode } from 'src/app/shared/general.models';
import { HybridDisplayModeComponent } from 'src/app/shared/hybrid.displaymode.component';
import { BreadcrumbService } from 'src/app/shared/layout/layout-main/navigation/breadcrumb/breadcrumb.service';
import { PaymentService } from 'src/app/shared/payment/+services/payment.service';

@AutoUnsubscribe()
@Component({
  selector: 'app-payment-method-new',
  templateUrl: './payment-method-new.component.html',
  styleUrls: ['./payment-method-new.component.scss']
})
export class PaymentMethodNewComponent extends HybridDisplayModeComponent implements OnInit {

  @ViewChild(StripeCardComponent) card: StripeCardComponent;
  @ViewChild(StripeIdealBankComponent) idealBank: StripeIdealBankComponent;

  @ViewChild(BankAccountComponent, {static: false}) bankAccountComponent: BankAccountComponent;


  stripeTest = this.createForm();

  cardOptions: StripeCardElementOptions = {
    style: {
      base: {
        iconColor: '#666EE8',
        color: '#31325F',
        fontWeight: '300',
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSize: '18px',
        '::placeholder': {
          color: '#CFD7E0'
        }
      }
    }
  };

  elementsOptions: StripeElementsOptions = {
    locale: 'en'
  };
  constructor(
    breadcrumbService: BreadcrumbService,
    protected fmBuilder: FormBuilder,
    protected service: PaymentService,
    protected router: Router,
    protected route: ActivatedRoute,
    protected stripeService: StripeService,
    protected dialog: MatDialog,
    private paymentService: PaymentService
  ) {
    super();

    breadcrumbService.build(NavigationItemIds.HOME, NavigationItemIds.QUOTES, NavigationItemIds.QUOTE_NEW);
    this.displayMode = ComponentDisplayMode.Dialog;

  }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    super.ngAfterViewInit();
    setTimeout(() => {
      this.initialize();
    }, 0);
  }
  private initialize() {
    if ([ComponentDisplayMode.Dialog, undefined].findIndex(dialogMode => dialogMode === this.displayMode) >= 0) {
      const dialogRef = this.dialog.open(BankingPaymentMethodDialog, {
        width: '450px', height: '350px',
        data: { displayMode: this.displayMode },
      });

      dialogRef.afterClosed().subscribe(result => {
        console.log(`Dialog result: ${result}`);
      });
    }
  }

  createForm() {
    return this.fmBuilder.group({
      name: [[Validators.required]],
      description: [],
      activateDate: [new Date(), [Validators.required]]
    });
  }


  async onSubmit(event: Event) {
    this.createToken();
  }


  async save(){
    if(this.bankAccountComponent){
      await this.bankAccountComponent.createBankAccount(true);
    } else {
      this.stripeService.createToken(this.card.element)
    }
  }

  createToken(): void {
    const name = this.stripeTest.get('name').value;
    this.stripeService
      .createToken(this.card.element, { name })
      .subscribe(async (result) => {
        if (result.token) {
          // Use the token
const source: ICreateSource

    await this.paymentService.createSource();

          console.log(result.token.id);
        } else if (result.error) {
          // Error creating the token
          console.log(result.error.message);
        }
      });
  }
}


@Component({
  selector: 'app-banking-paymentmethod-dialog',
  templateUrl: './payment-method-new.component.html',
  styleUrls: ['./payment-method-new.component.scss']
})
export class BankingPaymentMethodDialog extends PaymentMethodNewComponent{
  constructor(
    @Inject(MAT_DIALOG_DATA) public readonly data: { displayMode: ComponentDisplayMode },
    breadcrumbService: BreadcrumbService,
    fmBuilder: FormBuilder,
    service: PaymentService,
    router: Router,
    route: ActivatedRoute,
    stripeService: StripeService,
    dialog: MatDialog
    ) {
super(
  breadcrumbService,
  fmBuilder,
  service,
  router,
  route,
  stripeService,
  dialog);
    this.displayMode = data.displayMode;
    this.isDialog = true;

  }

  ngAfterViewInit() {
  }

}


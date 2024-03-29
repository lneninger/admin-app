import { firstValueFrom } from 'rxjs';
import { ICreateSourceRequestModel, IPaymentSource } from './../../../../../shared/payment/+models/source-create';
import { BankAccountComponent } from './../../../../../shared/payment/bank-account/bank-account.component';
import { Component, Inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
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
import { AuthService } from 'src/app/main/services/user/auth.service';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { UserService } from 'src/app/main/services/user/user.service';

@AutoUnsubscribe()
@Component({
  selector: 'app-system-product-new',
  templateUrl: './system-product-new.component.html',
  styleUrls: ['./system-product-new.component.scss']
})
export class PaymentMethodNewComponent extends HybridDisplayModeComponent implements OnInit {

  @ViewChild(StripeCardComponent) cardComponent: StripeCardComponent;
  // @ViewChild(StripeIdealBankComponent) idealBank: StripeIdealBankComponent;

  @ViewChild(BankAccountComponent, { static: false }) bankAccountComponent: BankAccountComponent;


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
    private paymentService: PaymentService,
    private authService: AuthService,
    private userService: UserService
  ) {
    super();

    breadcrumbService.build(NavigationItemIds.HOME, NavigationItemIds.SETTINGS, NavigationItemIds.SETTINGS_BANKING);
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
        width: '550px', height: '450px',
        data: { displayMode: this.displayMode },
      });

      dialogRef.afterClosed().subscribe(result => {
        console.log(`Dialog result: ${result}`);
      });
    }
  }

  createForm() {
    return this.fmBuilder.group({
      name: ['', [Validators.required]],
      description: [],
      activateDate: [new Date(), [Validators.required]]
    });
  }

  tabSelected($event: MatTabChangeEvent) {
    switch ($event.tab.textLabel) {
      case 'Credit card':
        // clear bank account selection
        if (this.bankAccountComponent) {
          this.bankAccountComponent.selectAccount = null;
        }
        break;
      case '':
        // clear bank account selection
        if (this.cardComponent) {
          this.stripeTest.reset();
        }
        break;
    }
  }

  refresh() {
    this.bankAccountComponent.refresh();

  }


  async onSubmit(event: Event) {
    this.createToken();
  }


  async save() {
    if (this.bankAccountComponent.selectedAccount) {
      await this.bankAccountComponent.createBankAccount(true);
    } else {
      // this.stripeService.createToken(this.cardComponent.element)
      await this.createToken();
    }
  }

  async createToken(): Promise<void> {
    const name = this.stripeTest.get('name').value;
    const result = await firstValueFrom(this.stripeService.createPaymentMethod({
      type: 'card',
      card: this.cardComponent.element,
      billing_details: {
        name
      }
    }));


    const req = {
      uid: this.authService.credentials.user.uid,
      paymentMethodId: result.paymentMethod.id
    };
    await this.paymentService.paymentMethodAttach(req);

    console.log(`card added`, result);

    //   this.stripeService
    //     // .createSource(this.cardComponent.element, {customer: this.userService.paymentId})
    //     .createToken(this.cardComponent.element, { name })
    //     .subscribe(async (result) => {
    //       if (result.token) {
    //         // Use the token
    //         const req: ICreateSourceRequestModel = {
    //           uid: this.authService.credentials.user.uid,
    //           type: 'card',
    //           source: {token: result.token.id} as IPaymentSource
    //         }

    //         await this.paymentService.createSource(req);

    //         console.log(result.token.id);
    //       }
    //       else
    //       if (result.error) {
    //         // Error creating the token
    //         console.log(result.error.message);
    //       }
    //     });
  }
}


@AutoUnsubscribe()
@Component({
  selector: 'app-system-product-new-dialog',
  templateUrl: './system-product-new.component.html',
  styleUrls: ['./system-product-new.component.scss']
})
export class BankingPaymentMethodDialog extends PaymentMethodNewComponent implements OnDestroy {
  constructor(
    @Inject(MAT_DIALOG_DATA) public readonly data: { displayMode: ComponentDisplayMode },
    breadcrumbService: BreadcrumbService,
    fmBuilder: FormBuilder,
    service: PaymentService,
    router: Router,
    route: ActivatedRoute,
    stripeService: StripeService,
    dialog: MatDialog,
    paymentService: PaymentService,
    authService: AuthService,
    userService: UserService
  ) {
    super(
      breadcrumbService,
      fmBuilder,
      service,
      router,
      route,
      stripeService,
      dialog,
      paymentService,
      authService,
      userService);
    this.displayMode = data.displayMode;

  }

  ngAfterViewInit() {
  }

  async ngOnDestroy() {
    await this.router.navigate(['', { outlets: { action: null } }]);
  }

}


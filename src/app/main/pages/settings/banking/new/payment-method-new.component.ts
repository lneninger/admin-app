import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { StripeCardElementOptions, StripeElementsOptions } from '@stripe/stripe-js';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';
import { StripeCardComponent, StripeIdealBankComponent, StripeService } from 'ngx-stripe';
import { NavigationItemIds } from 'src/app/main/main.navigation';
import { BaseComponent } from 'src/app/shared/base.component';
import { BreadcrumbService } from 'src/app/shared/layout/layout-main/navigation/breadcrumb/breadcrumb.service';
import { PaymentService } from 'src/app/shared/payment/+services/payment.service';

@AutoUnsubscribe()
@Component({
  selector: 'app-payment-method-new',
  templateUrl: './payment-method-new.component.html',
  styleUrls: ['./payment-method-new.component.scss']
})
export class PaymentMethodNewComponent extends BaseComponent implements OnInit {

  @ViewChild(StripeCardComponent) card: StripeCardComponent;
  @ViewChild(StripeIdealBankComponent) idealBank: StripeIdealBankComponent;

  stripeTest: FormGroup;

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
    private fmBuilder: FormBuilder,
    private service: PaymentService,
    private router: Router,
    private route: ActivatedRoute,
    private stripeService: StripeService
  ) {
    super();

    breadcrumbService.build(NavigationItemIds.HOME, NavigationItemIds.QUOTES, NavigationItemIds.QUOTE_NEW);
  }

  ngOnInit(): void {
  }

  createForm() {
    return this.fmBuilder.group({
      description: [],
      activateDate: [new Date(), [Validators.required]]
    });
  }


  async onSubmit(event: Event) {
    this.createToken();
  }


  createToken(): void {
    const name = this.stripeTest.get('name').value;
    this.stripeService
      .createToken(this.card.element, { name })
      .subscribe((result) => {
        if (result.token) {
          // Use the token
          console.log(result.token.id);
        } else if (result.error) {
          // Error creating the token
          console.log(result.error.message);
        }
      });
  }
}

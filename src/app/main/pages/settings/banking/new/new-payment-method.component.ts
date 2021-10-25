import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit, ViewChild } from '@angular/core';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';
import { NavigationItemIds } from 'src/app/main/main.navigation';
import { BaseComponent } from 'src/app/shared/base.component';
import { BreadcrumbService } from 'src/app/shared/layout/layout-main/navigation/breadcrumb/breadcrumb.service';
import { AddQuoteRequest } from 'src/app/main/services/quote/quote.models';
import { PaymentService } from 'src/app/main/services/payment/payment.service';
import { Select } from '@ngxs/store';
import { StripeCardElementOptions, StripeElementsOptions } from '@stripe/stripe-js';
import { StripeCardComponent, StripeIdealBankComponent, StripeService } from 'ngx-stripe';
import { Observable } from 'rxjs';
import { AggregatorsState } from 'src/app/main/services/+state-aggregators/aggregators.state';
import { MemberStateModel } from 'src/app/main/services/member/states/member.models';
import { TenantStateModel } from 'src/app/main/services/tenant/tenant.models';

@AutoUnsubscribe()
@Component({
  selector: 'app-new-payment-method',
  templateUrl: './new-payment-method.component.html',
  styleUrls: ['./new-payment-method.component.scss']
})
export class NewPaymentMethodComponent extends BaseComponent implements OnInit {

  @ViewChild(StripeCardComponent) card: StripeCardComponent;
  @ViewChild(StripeIdealBankComponent) idealBank: StripeIdealBankComponent;

  stripeTest: FormGroup;

  @Select(AggregatorsState.aggregatorMemberTenant)
  aggregatorMemberTenant$: Observable<{ member: MemberStateModel, tenant: TenantStateModel }>;

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

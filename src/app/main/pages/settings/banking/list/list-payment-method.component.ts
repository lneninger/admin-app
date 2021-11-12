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
  selector: 'app-list-payment-method',
  templateUrl: './list-payment-method.component.html',
  styleUrls: ['./list-payment-method.component.scss']
})
export class ListPaymentMethodComponent extends BaseComponent implements OnInit {


  paymentMethods$: Observable<any>;

  constructor(
    breadcrumbService: BreadcrumbService,
    private fmBuilder: FormBuilder,
    private service: PaymentService,
    private router: Router,
    private route: ActivatedRoute,
    private stripeService: StripeService
  ) {
    super();

    breadcrumbService.build(NavigationItemIds.HOME, NavigationItemIds.SETTINGS, NavigationItemIds.SETTINGS_BANKING);
  }

  ngOnInit(): void {
  }

  createForm() {

  }


}

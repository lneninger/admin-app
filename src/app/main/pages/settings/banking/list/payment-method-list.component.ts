import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';
import { StripeService } from 'ngx-stripe';
import { Observable } from 'rxjs';
import { NavigationItemIds } from 'src/app/main/main.navigation';
import { PaymentService } from 'src/app/shared/payment/+services/payment.service';
import { BaseComponent } from 'src/app/shared/base.component';
import { ComponentDisplayMode } from 'src/app/shared/general.models';
import { BreadcrumbService } from 'src/app/shared/layout/layout-main/navigation/breadcrumb/breadcrumb.service';
import { HybridDisplayModeComponent } from 'src/app/shared/hybrid.displaymode.component';

@AutoUnsubscribe()
@Component({
  selector: 'app-payment-method-list',
  templateUrl: './payment-method-list.component.html',
  styleUrls: ['./payment-method-list.component.scss']
})
export class PaymentMethodListComponent extends HybridDisplayModeComponent implements OnInit {


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

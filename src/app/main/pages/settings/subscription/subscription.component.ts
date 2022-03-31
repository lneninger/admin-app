import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Select } from '@ngxs/store';
import { StripeCardElementOptions, StripeElementsOptions } from '@stripe/stripe-js';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';
import { StripeCardComponent, StripeIdealBankComponent, StripeService } from 'ngx-stripe';
import { Observable, Subscription } from 'rxjs';
import { filter, first } from 'rxjs/operators';
import { NavigationItemIds } from 'src/app/main/main.navigation';
import { AggregatorsState } from 'src/app/main/services/+state-aggregators/aggregators.state';
import { TenantStateModel } from 'src/app/main/services/tenant/tenant.models';
import { UserStateModel } from 'src/app/main/services/user/user.models';
import { BaseComponent } from 'src/app/shared/base.component';
import { BreadcrumbService } from 'src/app/shared/layout/layout-main/navigation/breadcrumb/breadcrumb.service';
import { environment } from 'src/environments/environment';
import { PaymentUIService } from 'src/app/shared/payment/ui/payment-ui.service';
import { PaymentUIEvent } from 'src/app/shared/payment/ui/payment-ui.models';



@AutoUnsubscribe()
@Component({
  selector: 'app-settings-subscription',
  templateUrl: './subscription.component.html',
  styleUrls: ['./subscription.component.scss']
})
export class SettingsSubscriptionComponent extends BaseComponent implements OnInit, AfterViewInit {

  uiAction$$: Subscription;

  constructor(
    breadcrumbService: BreadcrumbService,
    private router: Router,
    private route: ActivatedRoute,
    private paymentUIService: PaymentUIService
  ) {

    super();

    breadcrumbService.build(NavigationItemIds.HOME, NavigationItemIds.SETTINGS, NavigationItemIds.SETTINGS_SUBSCRIPTION);
  }

  async ngOnInit() {
  }

  async ngAfterViewInit() {
    this.uiAction$$ = this.paymentUIService.broadcast$.subscribe(async action => this.closeAction(action));
  }

  async newPaymentMethod($event?: Event) {
    await this.router.navigate([{ outlets: { action: ['new'] } }],
      { relativeTo: this.route });
  }

  async closeAction($event?: PaymentUIEvent) {
      await this.router.navigate([{ outlets: { action: null } }],
      {relativeTo: this.route})
  }
}


import { ISubscriptionItemDetail } from './../../../services/subscription/subscription.models';
import { ISubscriptionItem } from 'src/app/main/services/subscription/subscription.models';
import { FirebaseService } from './../../../../shared/firebase/firebase.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Select } from '@ngxs/store';
import { StripeCardElementOptions, StripeElementsOptions } from '@stripe/stripe-js';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';
import { StripeCardComponent, StripeIdealBankComponent, StripeService } from 'ngx-stripe';
import { Observable, Subscription, lastValueFrom } from 'rxjs';
import { filter, first, map } from 'rxjs/operators';
import { NavigationItemIds } from 'src/app/main/main.navigation';
import { AggregatorsState } from 'src/app/main/services/+state-aggregators/aggregators.state';
import { TenantStateModel } from 'src/app/main/services/tenant/tenant.models';
import { UserStateModel } from 'src/app/main/services/user/user.models';
import { BaseComponent } from 'src/app/shared/base.component';
import { BreadcrumbService } from 'src/app/shared/layout/layout-main/navigation/breadcrumb/breadcrumb.service';
import { environment } from 'src/environments/environment';
import { PaymentUIService } from 'src/app/shared/payment/ui/payment-ui.service';
import { PaymentUIEvent } from 'src/app/shared/payment/ui/payment-ui.models';
import { SubscriptionService } from 'src/app/main/services/subscription/subscription.service';
import { IFireStoreDocument } from 'src/app/shared/firebase/firestore.models';



@AutoUnsubscribe()
@Component({
  selector: 'app-settings-subscription',
  templateUrl: './subscription.component.html',
  styleUrls: ['./subscription.component.scss']
})
export class SettingsSubscriptionComponent extends BaseComponent implements OnInit {

  uiAction$$: Subscription;
  items: IFireStoreDocument<ISubscriptionItem>[];

  constructor(
    breadcrumbService: BreadcrumbService,
    private router: Router,
    private firebaseService: FirebaseService,
    private subscriptionService: SubscriptionService
  ) {

    super();

    breadcrumbService.build(NavigationItemIds.HOME, NavigationItemIds.SETTINGS, NavigationItemIds.SETTINGS_SUBSCRIPTION);
  }

  ngOnInit() {
    setTimeout(async () => {
    this.items = await this.subscriptionService.getFull();
    }, 0);

  }
  getSubscriptions() {
    throw new Error('Method not implemented.');
  }

  selectUserSubscription(){
    this.subscriptionService;
  }
}


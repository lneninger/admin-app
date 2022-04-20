import { Component, OnInit } from '@angular/core';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';
import { Subscription } from 'rxjs';
import { NavigationItemIds } from 'src/app/main/main.navigation';
import { ISubscriptionItem } from 'src/app/main/services/subscription/subscription.models';
import { SubscriptionService } from 'src/app/main/services/subscription/subscription.service';
import { BaseComponent } from 'src/app/shared/base.component';
import { IFireStoreDocument } from 'src/app/shared/firebase/firestore.models';
import { BreadcrumbService } from 'src/app/shared/layout/layout-main/navigation/breadcrumb/breadcrumb.service';



@AutoUnsubscribe()
@Component({
  selector: 'app-settings-subscription',
  templateUrl: './subscription.component.html',
  styleUrls: ['./subscription.component.scss']
})
export class SettingsSubscriptionComponent extends BaseComponent implements OnInit {

  step: 'SELECT' | 'PAYMENT' | 'REVIEW' = 'SELECT';

  uiAction$$: Subscription;
  items: IFireStoreDocument<ISubscriptionItem>[];

  constructor(
    breadcrumbService: BreadcrumbService,
    private subscriptionService: SubscriptionService
  ) {

    super();

    breadcrumbService.build(NavigationItemIds.HOME, NavigationItemIds.SETTINGS, NavigationItemIds.SETTINGS_SUBSCRIPTION);
  }

  async ngOnInit() {
    this.items = await this.subscriptionService.getFull();
    // alert(`After set items: ${this.items.length}`);

  }

  selectUserSubscription(subscription: IFireStoreDocument<ISubscriptionItem>) {
    this.subscriptionService;
  }
}


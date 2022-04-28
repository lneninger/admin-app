import { AfterViewInit, Component } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';
import { StripeService } from 'ngx-stripe';
import { firstValueFrom, Subscription } from 'rxjs';
import { NavigationItemIds } from 'src/app/main/main.navigation';
import {
  ICheckoutSessionCreateRequest,
  ICheckoutSessionCreateResponse,
  ISubscriptionItem,
} from 'src/app/main/services/subscription/subscription.models';
import { SubscriptionService } from 'src/app/main/services/subscription/subscription.service';
import { AuthService } from 'src/app/main/services/user/auth.service';
import { BaseComponent } from 'src/app/shared/base.component';
import { IFireStoreDocument } from 'src/app/shared/firebase/firestore.models';
import { BreadcrumbService } from 'src/app/shared/layout/layout-main/navigation/breadcrumb/breadcrumb.service';

import {
  ConfirmDialogComponent,
  IConfirmDialogData,
} from './../../../../shared/components/confirm-dialog/confirm-dialog.component';


@AutoUnsubscribe()
@Component({
  selector: 'app-settings-subscription',
  templateUrl: './subscription.component.html',
  styleUrls: ['./subscription.component.scss']
})
export class SettingsSubscriptionComponent extends BaseComponent implements AfterViewInit {

  items: IFireStoreDocument<ISubscriptionItem>[];
  test: string;
  confirmDialog: MatDialogRef<ConfirmDialogComponent>;
  confirmDialog$$: Subscription;
  selectedSubscription: IFireStoreDocument<ISubscriptionItem>;

  constructor(
    breadcrumbService: BreadcrumbService,
    private subscriptionService: SubscriptionService,
    private dialog: MatDialog,
    private stripeService: StripeService,
    private authService: AuthService
  ) {
    super();
    breadcrumbService.build(NavigationItemIds.HOME, NavigationItemIds.SETTINGS, NavigationItemIds.SETTINGS_SUBSCRIPTION);
  }

  ngAfterViewInit() {
    setTimeout(async () => {
      // this.items = await timer(1000).pipe(map(_ => [])).pipe(first()).toPromise();
      console.log('this.items => ', this.items);
      this.items = await this.subscriptionService.getFull();
      // this.ngZone.run(() => { return; });
      // alert(`After set items: ${this.items.length}`);
    }, 0);
  }

  selectUserSubscription(subscription: IFireStoreDocument<ISubscriptionItem>) {
    this.confirmDialog = this.dialog.open(ConfirmDialogComponent, {
      panelClass: ['w-4/5', 'sm:3/5', 'gt-sm:w-2/5'],
      data: {
        message: `Confirm that you want to join the ${subscription.data.name} subscription`,
      } as IConfirmDialogData
    });

    this.confirmDialog$$ = this.confirmDialog.afterClosed().subscribe(async result => {
      if (result) {
        this.selectedSubscription = subscription;

        await this.runPaymentCheckoutIntoServer();
      }
    });
  }

  /**
   * Works but nee to active it in stripe and led to security product visualization treat
   */
  async runPaymentCheckout() {

    await firstValueFrom(this.stripeService.redirectToCheckout({
      successUrl: window.location.href,
      cancelUrl: window.location.href,
      lineItems: [{ price: this.selectedSubscription.data.st_priceid, quantity: 1 }],
      mode: 'subscription'
    }));
  }

  async runPaymentCheckoutIntoServer() {
    const req: ICheckoutSessionCreateRequest = {
      userId: this.authService.credentials?.user.uid,
      successUrl: window.location.href,
      cancelUrl: window.location.href,
      lineItems: [{ priceId: this.selectedSubscription.data.st_priceid, quantity: 1 }]
    };
    const sessionResponse = (await this.subscriptionService.createCheckoutSession(req)) as ICheckoutSessionCreateResponse;

    await firstValueFrom(this.stripeService.redirectToCheckout({
      sessionId: sessionResponse.sessionId
    }));

  }
}



import { AfterViewInit, Component, NgZone } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';
import { Subscription } from 'rxjs';
import { NavigationItemIds } from 'src/app/main/main.navigation';
import { ISubscriptionItem } from 'src/app/main/services/subscription/subscription.models';
import { SubscriptionService } from 'src/app/main/services/subscription/subscription.service';
import { BaseComponent } from 'src/app/shared/base.component';
import { IFireStoreDocument } from 'src/app/shared/firebase/firestore.models';
import { BreadcrumbService } from 'src/app/shared/layout/layout-main/navigation/breadcrumb/breadcrumb.service';
import { IPaymentCheckoutData, PaymentCheckoutDialogComponent } from 'src/app/shared/payment/checkout/checkout.component';

import { ConfirmDialogComponent, IConfirmDialogData } from './../../../../shared/components/confirm-dialog/confirm-dialog.component';



@AutoUnsubscribe()
@Component({
  selector: 'app-settings-subscription',
  templateUrl: './subscription.component.html',
  styleUrls: ['./subscription.component.scss']
})
export class SettingsSubscriptionComponent extends BaseComponent implements AfterViewInit {

  step: 'SELECT' | 'PAYMENT' | 'REVIEW' = 'PAYMENT';

  uiAction$$: Subscription;
  items: IFireStoreDocument<ISubscriptionItem>[];
  test: string;
  confirmDialog: MatDialogRef<ConfirmDialogComponent>;
  confirmDialog$$: Subscription;
  selectedSubscription: IFireStoreDocument<ISubscriptionItem>;
  paymentCheckoutDialog: MatDialogRef<PaymentCheckoutDialogComponent, any>;

  constructor(
    breadcrumbService: BreadcrumbService,
    private subscriptionService: SubscriptionService,
    private ngZone: NgZone,
    private dialog: MatDialog
  ) {
    super();
    breadcrumbService.build(NavigationItemIds.HOME, NavigationItemIds.SETTINGS, NavigationItemIds.SETTINGS_SUBSCRIPTION);
  }

  ngAfterViewInit() {
    setTimeout(async () => {
      this.items = await this.subscriptionService.getFull();
      this.ngZone.run(() => { return; });
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

    this.confirmDialog$$ = this.confirmDialog.afterClosed().subscribe(result => {
      if (result) {
        this.selectedSubscription = subscription;

        this.runPaymentCheckout();
      }
    });
  }
  runPaymentCheckout() {
    this.paymentCheckoutDialog = this.dialog.open(PaymentCheckoutDialogComponent, {
      panelClass: ['w-full', 'gt-md:10/12'],
      data: {
      } as IPaymentCheckoutData

    });
  }
}


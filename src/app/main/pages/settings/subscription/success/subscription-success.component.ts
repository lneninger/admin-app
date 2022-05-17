import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';
import { Subscription } from 'rxjs';
import { NavigationItemIds } from 'src/app/main/main.navigation';
import { ISubscriptionItem, IUserSubscriptionGetResponse } from 'src/app/main/services/subscription/subscription.models';
import { SubscriptionService } from 'src/app/main/services/subscription/subscription.service';
import { AuthService } from 'src/app/main/services/user/auth.service';
import { BaseComponent } from 'src/app/shared/base.component';
import { ConfirmDialogComponent } from 'src/app/shared/components/confirm-dialog/confirm-dialog.component';
import { IFireStoreDocument as IFirestoreDocument } from 'src/app/shared/firebase/firestore.models';
import { BreadcrumbService } from 'src/app/shared/layout/layout-main/navigation/breadcrumb/breadcrumb.service';




@AutoUnsubscribe()
@Component({
  selector: 'app-settings-subscription-success',
  templateUrl: './subscription-success.component.html',
  styleUrls: ['./subscription-success.component.scss']
})
export class SettingsSubscriptionSuccessComponent extends BaseComponent implements OnInit {

  items: IFirestoreDocument<ISubscriptionItem>[];
  test: string;
  confirmDialog: MatDialogRef<ConfirmDialogComponent>;
  confirmDialog$$: Subscription;
  selectedSubscription: IFirestoreDocument<ISubscriptionItem>;
  userSubscription: IFirestoreDocument<ISubscriptionItem>;

  constructor(
    breadcrumbService: BreadcrumbService,
    private subscriptionService: SubscriptionService,
    private authService: AuthService,

  ) {
    super();
    breadcrumbService.build(NavigationItemIds.HOME, NavigationItemIds.SETTINGS, NavigationItemIds.SETTINGS_SUBSCRIPTION);
  }

  async ngOnInit() {
    this.userSubscription = await this.subscriptionService.getUserSubscription({
      userId: this.authService.user.uid,
      tryFromSource: true
    });

  }


}



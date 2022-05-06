import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';
import { StripeService } from 'ngx-stripe';
import { firstValueFrom, Subscription } from 'rxjs';
import { NavigationItemIds } from 'src/app/main/main.navigation';
import {
  ICheckoutSessionCreateRequest,
  ICheckoutSessionCreateResponse,
  ISubscriptionItem,
  IUserSubscriptionGetResponse,
} from 'src/app/main/services/subscription/subscription.models';
import { SubscriptionService } from 'src/app/main/services/subscription/subscription.service';
import { AuthService } from 'src/app/main/services/user/auth.service';
import { BaseComponent } from 'src/app/shared/base.component';
import {
  ConfirmDialogComponent,
  IConfirmDialogData,
} from 'src/app/shared/components/confirm-dialog/confirm-dialog.component';
import { IFireStoreDocument } from 'src/app/shared/firebase/firestore.models';
import { BreadcrumbService } from 'src/app/shared/layout/layout-main/navigation/breadcrumb/breadcrumb.service';




@AutoUnsubscribe()
@Component({
  selector: 'app-settings-subscription-success',
  templateUrl: './subscription-success.component.html',
  styleUrls: ['./subscription-success.component.scss']
})
export class SettingsSubscriptionSuccessComponent extends BaseComponent implements OnInit {

  items: IFireStoreDocument<ISubscriptionItem>[];
  test: string;
  confirmDialog: MatDialogRef<ConfirmDialogComponent>;
  confirmDialog$$: Subscription;
  selectedSubscription: IFireStoreDocument<ISubscriptionItem>;
  userSubscription: IUserSubscriptionGetResponse;

  constructor(
    breadcrumbService: BreadcrumbService,
  ) {
    super();
    breadcrumbService.build(NavigationItemIds.HOME, NavigationItemIds.SETTINGS, NavigationItemIds.SETTINGS_SUBSCRIPTION);
  }

  async ngOnInit() {

  }


}



import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';
import { StripeService } from 'ngx-stripe';
import { NavigationItemIds } from 'src/app/main/main.navigation';
import { SubscriptionUIService } from 'src/app/main/services/subscription/ui/subscription-ui.service';
import { AuthService } from 'src/app/main/services/user/auth.service';
import { FirebaseService } from 'src/app/shared/firebase/firebase.service';
import { ComponentDisplayMode } from 'src/app/shared/general.models';
import { HybridDisplayModeComponent } from 'src/app/shared/hybrid.displaymode.component';
import { BreadcrumbService } from 'src/app/shared/layout/layout-main/navigation/breadcrumb/breadcrumb.service';
import { PaymentService } from 'src/app/shared/payment/+services/payment.service';

@AutoUnsubscribe()
@Component({
  selector: 'app-subscription-edit',
  templateUrl: './subscription-edit.component.html',
  styleUrls: ['./subscription-edit.component.scss']
})
export class SubscriptionEditComponent extends HybridDisplayModeComponent implements OnInit {


  form = this.createForm();

  constructor(
    breadcrumbService: BreadcrumbService,
    protected fmBuilder: FormBuilder,
    protected service: PaymentService,
    protected stripeService: StripeService,
    protected dialog: MatDialog,
    private paymentService: PaymentService,
    private authService: AuthService,
    protected subscriptionUIService: SubscriptionUIService,
    private firebaseService: FirebaseService
  ) {
    super();

    breadcrumbService.build(NavigationItemIds.HOME, NavigationItemIds.ADMIN, NavigationItemIds.ADMIN_SUBSCRIPTIONS);
    this.displayMode = ComponentDisplayMode.Dialog;

  }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    super.ngAfterViewInit();
    setTimeout(() => {
      this.initialize();
    }, 0);
  }
  private initialize() {
    if ([ComponentDisplayMode.Dialog, undefined].findIndex(dialogMode => dialogMode === this.displayMode) >= 0) {
      const dialogRef = this.dialog.open(SubscriptionEditDialog, {
        panelClass: ['w-4/5', 'sm:3/5', 'gt-sm:w-2/5'],
        data: { displayMode: this.displayMode },
        hasBackdrop: true,
        closeOnNavigation: true
      });

      dialogRef.afterClosed().subscribe(result => {
        this.subscriptionUIService.closeAction('new');
      });
    }
  }

  createForm() {
    return this.fmBuilder.group({
      name: ['', [Validators.required]],
      price: [1.5, [Validators.required]],
      activateDate: [new Date(), [Validators.required]]
    });
  }

  async onSubmit(event: Event) {
    this.save();
  }


  async save() {

    if (this.form.valid) {
      const data = this.form.getRawValue();
      await this.firebaseService.firestore.collection('app-subscriptions').add(data);

      this.dialog.closeAll();
    }
  }


}


@AutoUnsubscribe()
@Component({
  selector: 'app-subscription-dialog',
  templateUrl: './subscription-edit.component.html',
  styleUrls: ['./subscription-edit.component.scss']
})
export class SubscriptionEditDialog extends SubscriptionEditComponent implements OnDestroy {
  constructor(
    @Inject(MAT_DIALOG_DATA) public readonly data: { displayMode: ComponentDisplayMode },
    breadcrumbService: BreadcrumbService,
    fmBuilder: FormBuilder,
    service: PaymentService,
    stripeService: StripeService,
    dialog: MatDialog,
    paymentService: PaymentService,
    authService: AuthService,
    subscriptionUIService: SubscriptionUIService,
    firebaseService: FirebaseService
  ) {
    super(
      breadcrumbService,
      fmBuilder,
      service,

      stripeService,
      dialog,
      paymentService,
      authService,
      subscriptionUIService,
      firebaseService);
    this.displayMode = data.displayMode;
    this.isDialog = true;

  }

  ngAfterViewInit() {
  }

  async ngOnDestroy() {
  }

}


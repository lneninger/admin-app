import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';
import { StripeService } from 'ngx-stripe';
import { NavigationItemIds } from 'src/app/main/main.navigation';
import { SubscriptionUIEvent, SubscriptionUIEventType } from 'src/app/main/services/subscription/ui/subscription-ui.models';
import { SubscriptionUIService } from 'src/app/main/services/subscription/ui/subscription-ui.service';
import { AuthService } from 'src/app/main/services/user/auth.service';
import { FirebaseService } from 'src/app/shared/firebase/firebase.service';
import { ComponentDisplayMode } from 'src/app/shared/general.models';
import { HybridDisplayModeComponent } from 'src/app/shared/hybrid.displaymode.component';
import { BreadcrumbService } from 'src/app/shared/layout/layout-main/navigation/breadcrumb/breadcrumb.service';
import { PaymentService } from 'src/app/shared/payment/+services/payment.service';

@AutoUnsubscribe()
@Component({
  selector: 'app-subscription-new',
  templateUrl: './subscription-new.component.html',
  styleUrls: ['./subscription-new.component.scss']
})
export class SubscriptionNewComponent extends HybridDisplayModeComponent implements OnInit {


  form = this.createForm();

  //#region Dialog
  dialogRef: MatDialogRef<SubscriptionNewDialog>;
  dialogConfig: { host: SubscriptionNewComponent }
  //#endregion

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
      this.dialogRef = this.dialog.open(SubscriptionNewDialog, {
        panelClass: ['w-4/5', 'sm:3/5', 'gt-sm:w-2/5'],
        data: {
          host: this
         },
        hasBackdrop: true,
        closeOnNavigation: true
      });

      this.dialogRef.afterClosed().subscribe(($event) => {
        this.subscriptionUIService.closeAction($event);
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
    let form: FormGroup;
    if (this.dialogConfig) {
      form = this.dialogConfig.host.form;
    }

    if (form.valid) {
      const data = form.getRawValue();
      await this.firebaseService.firestore.collection('app-subscriptions').add(data);

      if (this.dialogConfig) {
        this.dialogConfig.host.dialogRef.close({ type: SubscriptionUIEventType.closeAction, action: 'new' } as SubscriptionUIEvent);
      }
    }
  }

  cancel() {
    if (this.dialogConfig) {
      this.dialogConfig.host.dialogRef.close({ type: SubscriptionUIEventType.cancelAction, action: 'new' } as SubscriptionUIEvent);
    }
  }


}


@AutoUnsubscribe()
@Component({
  selector: 'app-subscription-dialog',
  templateUrl: './subscription-new.component.html',
  styleUrls: ['./subscription-new.component.scss']
})
export class SubscriptionNewDialog extends SubscriptionNewComponent implements OnDestroy {
  constructor(
    @Inject(MAT_DIALOG_DATA) public readonly config: { host: SubscriptionNewComponent },
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
    this.dialogConfig = config;
  }

  ngAfterViewInit() {
  }

  async ngOnDestroy() {
  }

}


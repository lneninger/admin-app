import { firstValueFrom } from 'rxjs';
import { ISubscriptionItem } from 'src/app/main/services/subscription/subscription.models';
import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';
import { StripeService } from 'ngx-stripe';
import { NavigationItemIds } from 'src/app/main/main.navigation';
import { SubscriptionUIEvent, SubscriptionUIEventType } from 'src/app/main/services/subscription/ui/subscription-ui.models';
import { SubscriptionUIService } from 'src/app/main/services/subscription/ui/subscription-ui.service';
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

  SubscriptionUIEventType = SubscriptionUIEventType;
  form: FormGroup;

  //#region Dialog
  dialogRef: MatDialogRef<SubscriptionEditDialog>;
  dialogConfig: { host: SubscriptionEditComponent }
  id: string;
  //#endregion

  constructor(
    breadcrumbService: BreadcrumbService,
    protected fmBuilder: FormBuilder,
    protected service: PaymentService,
    protected stripeService: StripeService,
    protected dialog: MatDialog,
    protected subscriptionUIService: SubscriptionUIService,
    private firebaseService: FirebaseService,
    private route: ActivatedRoute,
  ) {
    super();

    breadcrumbService.build(NavigationItemIds.HOME, NavigationItemIds.ADMIN, NavigationItemIds.ADMIN_SUBSCRIPTIONS);
    this.displayMode = ComponentDisplayMode.Dialog;

  }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    super.ngAfterViewInit();
    setTimeout(async () => {
      this.form = await this.createForm();
      this.initialize();
    }, 0);
  }
  private initialize() {
    if (this.isDialog) {
      this.dialogRef = this.dialog.open(SubscriptionEditDialog, {
        panelClass: ['w-4/5', 'sm:3/5', 'gt-sm:w-2/5'],
        data: {
          host: this
        },
        hasBackdrop: true,
        closeOnNavigation: true
      });

      this.dialogRef.afterClosed().subscribe((result: SubscriptionUIEvent) => {
        this.subscriptionUIService.closeAction(result);
      });
    }
  }

  async createForm() {
    this.id = this.route.snapshot.params.id;
    const doc = await firstValueFrom(this.firebaseService.firestore.doc<ISubscriptionItem>(`app-subscriptions/${this.id}`).get());
    const docData = doc.data();
    return this.fmBuilder.group({
      name: [docData.name, [Validators.required]],
      price: [docData.price, [Validators.required]],
      activateDate: [docData.activateDate, [Validators.required]]
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
      await this.firebaseService.firestore.doc(`app-subscriptions/${this.id}`).set(data);

      if (this.dialogConfig) {
        this.dialogConfig.host.dialogRef.close({ type: SubscriptionUIEventType.closeAction, action: 'edit' } as SubscriptionUIEvent);
      }
    }
  }

  cancel() {
    if (this.dialogConfig) {
      this.dialogConfig.host.dialogRef.close({ type: SubscriptionUIEventType.cancelAction, action: 'edit' } as SubscriptionUIEvent);
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
    @Inject(MAT_DIALOG_DATA) readonly config: { host: SubscriptionEditComponent },
    breadcrumbService: BreadcrumbService,
    fmBuilder: FormBuilder,
    service: PaymentService,
    stripeService: StripeService,
    dialog: MatDialog,
    subscriptionUIService: SubscriptionUIService,
    firebaseService: FirebaseService,
    route: ActivatedRoute,
  ) {
    super(
      breadcrumbService,
      fmBuilder,
      service,
      stripeService,
      dialog,
      subscriptionUIService,
      firebaseService,
      route);
    this.dialogConfig = config;

  }

  ngAfterViewInit() {
  }

  async ngOnDestroy() {
  }

}


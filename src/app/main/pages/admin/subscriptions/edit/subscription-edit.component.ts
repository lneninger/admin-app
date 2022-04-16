import { AfterViewInit, Component, Inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSelectionList } from '@angular/material/list';
import { ActivatedRoute } from '@angular/router';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';
import { StripeService } from 'ngx-stripe';
import { lastValueFrom, Subscription } from 'rxjs';
import { NavigationItemIds } from 'src/app/main/main.navigation';
import { ISubscriptionItem } from 'src/app/main/services/subscription/subscription.models';
import { SubscriptionService } from 'src/app/main/services/subscription/subscription.service';
import { SubscriptionUIEvent, SubscriptionUIEventType } from 'src/app/main/services/subscription/ui/subscription-ui.models';
import { SubscriptionUIService } from 'src/app/main/services/subscription/ui/subscription-ui.service';
import { BaseComponent } from 'src/app/shared/base.component';
import { FirebaseService } from 'src/app/shared/firebase/firebase.service';
import { IFireStoreDocument } from 'src/app/shared/firebase/firestore.models';
import { ComponentDisplayMode } from 'src/app/shared/general.models';
import { HybridDisplayModeComponent } from 'src/app/shared/hybrid.displaymode.component';
import { BreadcrumbService } from 'src/app/shared/layout/layout-main/navigation/breadcrumb/breadcrumb.service';

import { ISubscriptionItemDetail } from './../../../../services/subscription/subscription.models';

@AutoUnsubscribe()
@Component({
  selector: 'app-subscription-edit',
  template: '<i></i>'
})
export class SubscriptionEditComponent extends HybridDisplayModeComponent implements OnInit {

  SubscriptionUIEventType = SubscriptionUIEventType;
  //#region Dialog
  dialogRef: MatDialogRef<SubscriptionEditDialog>;

  //#endregion




  constructor(
    breadcrumbService: BreadcrumbService,
    protected service: SubscriptionService,
    protected stripeService: StripeService,
    protected dialog: MatDialog,
    protected subscriptionUIService: SubscriptionUIService,
    private route: ActivatedRoute,
  ) {
    super();

    breadcrumbService.build(NavigationItemIds.HOME, NavigationItemIds.ADMIN, NavigationItemIds.ADMIN_SUBSCRIPTIONS);
    this.displayMode = ComponentDisplayMode.Dialog;

  }

  ngOnInit(): void {
    return;
  }

  ngAfterViewInit() {
    super.ngAfterViewInit();
    setTimeout(async () => {
      this.initializeDialog();
    }, 0);
  }

  private initializeDialog() {
    if (this.isDialog) {
      this.dialogRef = this.dialog.open(SubscriptionEditDialog, {
        panelClass: ['w-4/5', 'sm:3/5', 'gt-sm:w-2/5'],
        data: {
          id: this.route.snapshot.params.id
        } as IDialogData,
        hasBackdrop: true,
        closeOnNavigation: true
      });

      this.dialogRef.afterClosed().subscribe((result: SubscriptionUIEvent) => {
        this.subscriptionUIService.closeAction(result);
      });
    }
  }



}


@AutoUnsubscribe()
@Component({
  selector: 'app-subscription-dialog',
  templateUrl: './subscription-dialog-edit.component.html',
  styleUrls: ['./subscription-edit.component.scss']
})
export class SubscriptionEditDialog extends BaseComponent implements AfterViewInit, OnDestroy {

  id: string;
  details: IFireStoreDocument<ISubscriptionItemDetail>[];
  docData: IFireStoreDocument<ISubscriptionItem>;
  form: FormGroup;

  editStep: number;

  private _priceModel: number;
  detailListener$$: Subscription;
  set priceModel(value: number) {
    this._priceModel = value;
    this.form.get('price')?.setValue(value);
  }
  get priceModel(): number {
    return this._priceModel || this.form?.get('price')?.value;
  }

  detailDescription: string;
  panelOpenState: 'form' | 'delete' = 'form';

  @ViewChild('detailsList')
  detailsList: MatSelectionList;

  constructor(
    @Inject(MAT_DIALOG_DATA) public readonly config: IDialogData,
    protected fmBuilder: FormBuilder,
    protected service: SubscriptionService,
    protected subscriptionUIService: SubscriptionUIService,
    private firebaseService: FirebaseService,
    private dialogRef: MatDialogRef<SubscriptionEditDialog>,
  ) {
    super();
  }
  async ngOnInit() {
    this.form = await this.createForm();
    this.initializeListeners();
  }

  ngAfterViewInit() {
    return;
  }

  async ngOnDestroy() {
    return;
  }

  initializeListeners() {
    const ref = this.firebaseService.firestore.collection(`app-subscriptions/${this.id}/details`, (queryRef) => {
      return queryRef.orderBy('description', 'asc');
    });
    ref.snapshotChanges().subscribe(detailsResult => {
      this.details = detailsResult.map(detail => {
        return SubscriptionService.map(detail.payload.doc);
      }) as unknown as IFireStoreDocument<ISubscriptionItemDetail>[];
    })
  }



  async createForm() {
    this.id = this.config.id;
    const doc = await lastValueFrom(this.firebaseService.firestore.doc<ISubscriptionItem>(`app-subscriptions/${this.id}`).get());
    const docData = doc.data();
    if (docData) {
      return this.fmBuilder.group({
        name: [docData.name, [Validators.required]],
        order: [docData.order, [Validators.required]],
        description: [docData.description, [Validators.required]],
        icon: [docData.icon, [Validators.required]],
        price: [docData.price, [Validators.required]],
        activateDate: [docData.activateDate, [Validators.required]],
        markedForDelete: [docData.markedForDelete],
      });
    } else {
      this.subscriptionUIService.closeAction(null);
    }
  }

  async onSubmit() {
    this.save();
  }


  async save() {
    let form = this.form;

    if (form.valid) {
      const data = form.getRawValue();
      await this.firebaseService.firestore.collection(`app-subscriptions`).doc(this.id).set(data);
      this.dialogRef.close({ type: SubscriptionUIEventType.closeAction, action: 'edit' } as SubscriptionUIEvent);
    }
  }

  cancel() {
    this.close();
  }

  addDetail(description: string) {
    let id = this.id;
    const model = { description } as ISubscriptionItemDetail;
    this.service.addDetail(id, model);
    this.detailDescription = undefined;
  }

  close() {
    this.dialogRef.close({ type: SubscriptionUIEventType.cancelAction, action: 'edit' } as SubscriptionUIEvent);
  }

  detailInputActivated($event) {
    return $event;
  }

  detailInputProcess($event) {
    this.addDetail(this.detailDescription);
    return $event;
  }

  deleteSelectedDetails() {
    this.detailsList.selectedOptions.selected.forEach(selected => {
      const value = selected.value as IFireStoreDocument<ISubscriptionItemDetail>;
      console.log(`value => `, value);
      value.$original.ref.delete();
    });
  }
}

export interface IDialogData {
  id: string
}


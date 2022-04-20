import { DataSource } from '@angular/cdk/table';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';
import { Observable, ReplaySubject, Subscription } from 'rxjs';
import { NavigationItemIds } from 'src/app/main/main.navigation';
import { ISubscriptionItem } from 'src/app/main/services/subscription/subscription.models';
import { SubscriptionService } from 'src/app/main/services/subscription/subscription.service';
import { SubscriptionUIEvent, SubscriptionUIEventType } from 'src/app/main/services/subscription/ui/subscription-ui.models';
import { BaseComponent } from 'src/app/shared/base.component';
import { IFireStoreDocument } from 'src/app/shared/firebase/firestore.models';
import { FirestoreGridConfig } from 'src/app/shared/grid/firestore/firestore-grid.service';
import { DataRetrieverInput, gridAppendNewItems, IGridOptions } from 'src/app/shared/grid/grid-config';
import { BreadcrumbService } from 'src/app/shared/layout/layout-main/navigation/breadcrumb/breadcrumb.service';
import { ISelectorConfig } from 'src/app/shared/selectors/selectors.models';

import { SubscriptionUIService } from './../../../services/subscription/ui/subscription-ui.service';



@AutoUnsubscribe()
@Component({
  selector: 'app-subscriptions',
  templateUrl: './subscriptions.component.html',
  styleUrls: ['./subscriptions.component.scss']
})
export class AdminSubscriptionsComponent extends BaseComponent implements OnInit, AfterViewInit {

  gridFilterConfig: ISelectorConfig = {
    items: [
      {
        identifier: 'filter-speciality',
        label: 'Speciality',
        type: 'multiSelect',
        operators: ['==', '<>'],
        valueOptions: [
          {
            label: 'test1',
            value: 'result1'
          },
          {
            label: 'test2',
            value: 'result2'
          }
        ]
      },

      {
        identifier: 'filter-firstname',
        label: 'First Name',
        type: 'input',
        operators: ['==', '<>'],
      }
    ]
  };

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<IFireStoreDocument<ISubscriptionItem>>;

  displayedColumns: string[] = ['name', 'activateDate', 'price', 'options'];

  dataResponse: ISubscriptionItem[];

  uiAction$$: Subscription;

  dataSource = new SubscriptionsDataSource([]);


  constructor(
    breadcrumbService: BreadcrumbService,
    private service: SubscriptionService,
    private router: Router,
    private route: ActivatedRoute,
    private subscriptionUIService: SubscriptionUIService,
    public gridConfig: FirestoreGridConfig<IFireStoreDocument<ISubscriptionItem>>
  ) {
    super();
    breadcrumbService.build(NavigationItemIds.HOME, NavigationItemIds.ADMIN, NavigationItemIds.ADMIN_SUBSCRIPTIONS);
  }


  ngOnInit(): void {
  }

  ngOnDestroy(){
    super.ngOnDestroy();
    this.gridConfig.dispose();
  }

  async ngAfterViewInit() {
    setTimeout(() => {
      this.uiAction$$ = this.subscriptionUIService.broadcast$.subscribe(async ($event: SubscriptionUIEvent) => this.closeAction($event));
      this.gridConfig.initialize(this.paginator, this.sort, {
        dataRetriever: this.retrieveData.bind(this),
        defaultSortField: 'name',
        addNewItems: gridAppendNewItems,
        onDataReady: this.onGridConfigDataReady.bind(this)
      } as IGridOptions);

      this.gridConfig.refresh();
    })
  }

  onGridConfigDataReady(items: IFireStoreDocument<ISubscriptionItem>[]) {
    setTimeout(() => {
      this.dataSource.setData(items);
    }, 0);
  }

  async retrieveData(input?: DataRetrieverInput) {
    return await this.service.search(input);
  }

  async newSubscription($event) {
    await this.router.navigate([{ outlets: { action: 'new' } }], { relativeTo: this.route });
  }

  async edit(row: IFireStoreDocument<ISubscriptionItem>) {
    await this.router.navigate([{ outlets: { action: ['edit', row.id] } }], { relativeTo: this.route });
  }

  async closeAction($event?: SubscriptionUIEvent) {
    await this.router.navigate([{ outlets: { action: null } }],
      { relativeTo: this.route });

    if ($event.type !== SubscriptionUIEventType.cancelAction) {
      this.gridConfig.refresh();
    }
  }

}

class SubscriptionsDataSource extends DataSource<IFireStoreDocument<ISubscriptionItem>> {
  private _dataStream = new ReplaySubject<IFireStoreDocument<ISubscriptionItem>[]>();

  constructor(initialData: IFireStoreDocument<ISubscriptionItem>[]) {
    super();
    this.setData(initialData);
  }

  connect(): Observable<IFireStoreDocument<ISubscriptionItem>[]> {
    return this._dataStream;
  }

  disconnect() {}

  setData(data: IFireStoreDocument<ISubscriptionItem>[]) {
    this._dataStream.next(data);
  }
}

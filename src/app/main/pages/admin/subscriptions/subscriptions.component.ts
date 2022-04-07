import { SubscriptionUIService } from './../../../services/subscription/ui/subscription-ui.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';
import { NavigationItemIds } from 'src/app/main/main.navigation';
import { ISubscriptionItem } from 'src/app/main/services/subscription/subscription.models';
import { SubscriptionService } from 'src/app/main/services/subscription/subscription.service';
import { BaseComponent } from 'src/app/shared/base.component';
import { DataRetrieverInput, GridConfig, gridAppendNewItems, IGridOptions } from 'src/app/shared/grid/grid-config';
import { BreadcrumbService } from 'src/app/shared/layout/layout-main/navigation/breadcrumb/breadcrumb.service';
import { ISelectorConfig } from 'src/app/shared/selectors/selectors.models';
import { SubscriptionUIEvent, SubscriptionUIEventType } from 'src/app/main/services/subscription/ui/subscription-ui.models';
import { Subscription } from 'rxjs';
import { actionMatcher } from '@ngxs/store';
import { IFireStoreDocument } from 'src/app/shared/firebase/firestore.models';



@AutoUnsubscribe()
@Component({
  selector: 'app-subscriptions',
  templateUrl: './subscriptions.component.html',
  styleUrls: ['./subscriptions.component.scss']
})
export class AdminSubscriptionsComponent extends BaseComponent implements OnInit {


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

  displayedColumns: string[] = ['name', 'activateDate', 'price', 'options'];


  gridConfig: GridConfig<IFireStoreDocument<ISubscriptionItem>>;

  dataResponse: ISubscriptionItem[];

  @ViewChild(MatTable) table: MatTable<ISubscriptionItem>;

  uiAction$$: Subscription;

  constructor(
    breadcrumbService: BreadcrumbService,
    private service: SubscriptionService,
    private router: Router,
    private route: ActivatedRoute,
    private subscriptionUIService: SubscriptionUIService,
  ) {
    super();
    breadcrumbService.build(NavigationItemIds.HOME, NavigationItemIds.ADMIN, NavigationItemIds.ADMIN_SUBSCRIPTIONS);
  }


  ngOnInit(): void {
    this.gridConfig = new GridConfig<IFireStoreDocument<ISubscriptionItem>>({
      dataRetriever: this.retrieveData.bind(this),
      defaultSortField: 'name',
      addNewItems: gridAppendNewItems
    } as IGridOptions);
  }

  async ngAfterViewInit() {
    setTimeout(() => {
      this.uiAction$$ = this.subscriptionUIService.broadcast$.subscribe(async ($event: SubscriptionUIEvent) => this.closeAction($event));
      this.gridConfig.initialize(this.paginator, this.sort);
      this.gridConfig.refresh();
    })
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

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
import { DataRetrieverInput, GridConfig } from 'src/app/shared/grid/grid-config';
import { BreadcrumbService } from 'src/app/shared/layout/layout-main/navigation/breadcrumb/breadcrumb.service';
import { ISelectorConfig } from 'src/app/shared/selectors/selectors.models';



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

  displayedColumns: string[] = ['description'];


  gridConfig: GridConfig<ISubscriptionItem>;

  dataResponse: ISubscriptionItem[];

  @ViewChild(MatTable) table: MatTable<ISubscriptionItem>;


  constructor(
    breadcrumbService: BreadcrumbService,
    private service: SubscriptionService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    super();
    breadcrumbService.build(NavigationItemIds.HOME, NavigationItemIds.ADMIN, NavigationItemIds.ADMIN_SUBSCRIPTIONS);
  }


  ngOnInit(): void {
    this.gridConfig = new GridConfig<ISubscriptionItem>(this.retrieveData.bind(this));
  }

  async ngAfterViewInit() {
    this.gridConfig.initialize(this.paginator, this.sort);
    this.gridConfig.refresh();
  }


  async retrieveData(input?: DataRetrieverInput) {
    const result = await this.service.search(input);
    return result;
  }

  async newSubscription($event) {
    await this.router.navigate([{ outlets: { action: 'new' } }], { relativeTo: this.route });

  }

  async edit(row: ISubscriptionItem) {
    await this.router.navigate([{ outlets: { action: 'edit' } }], { state: row, relativeTo: this.route });

  }

}

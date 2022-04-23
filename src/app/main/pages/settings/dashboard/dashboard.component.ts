import { Component, OnInit } from '@angular/core';
import { Select } from '@ngxs/store';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';
import { Observable } from 'rxjs';
import { NavigationItemIds } from 'src/app/main/main.navigation';
import { AggregatorsState } from 'src/app/main/services/+state-aggregators/aggregators.state';
import { UserStateModel } from 'src/app/main/services/user/user.models';
import { AppMenuService } from 'src/app/main/shared/menu/app-menu.service';
import { BaseComponent } from 'src/app/shared/base.component';
import { BreadcrumbService } from 'src/app/shared/layout/layout-main/navigation/breadcrumb/breadcrumb.service';
import { NavigationItem } from 'src/app/shared/layout/layout-main/navigation/navigation.models';


const productContexts = [
  {
    id: 1,
    name: 'Community',
    stage: 'Eligibility',
    icon: 'fa-address-card',
    fontSet: 'far'
  },
  {
    id: 2,
    name: 'Medicaid',
    stage: 'Eligibility',
    icon: 'fa-handshake',
    fontSet: 'far'
  },
  {
    id: 3,
    name: 'LIS',
    stage: 'Eligibility',
    icon: 'fa-dollar-sign',
    fontSet: 'fas'
  },
  {
    id: 4,
    name: 'SNAP',
    stage: 'Eligibility',
    icon: 'fa-utensils',
    fontSet: 'fas'
  },
  {
    id: 5,
    name: 'Veteran',
    stage: 'ENGAGEMENT',
    icon: 'fa-flag-usa',
    fontSet: 'fas'
  }
];

@AutoUnsubscribe()
@Component({
  selector: 'app-settings-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class SettingsDashboardComponent extends BaseComponent implements OnInit {


  productContexts = productContexts;
  navigationItems: NavigationItem[];

  constructor(
    breadcrumbService: BreadcrumbService,
    private menuService: AppMenuService
    ) {
    super();

    breadcrumbService.build(NavigationItemIds.HOME, NavigationItemIds.ADMIN, NavigationItemIds.ADMIN_DASHBOARD);
  }


  ngOnInit() {
    this.navigationItems = [
      this.menuService.navigationService.findItem(NavigationItemIds.SETTINGS_BANKING),
      this.menuService.navigationService.findItem(NavigationItemIds.SETTINGS_SUBSCRIPTION)
    ];

  }

}

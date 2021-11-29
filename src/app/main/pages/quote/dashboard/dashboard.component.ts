import { UserStateModel } from './../../../services/user/user.models';
import { Component, OnInit } from '@angular/core';
import { Select } from '@ngxs/store';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';
import { Observable } from 'rxjs';
import { AggregatorsState } from 'src/app/main/services/+state-aggregators/aggregators.state';
import { TenantStateModel } from 'src/app/main/services/tenant/tenant.models';
import { BaseComponent } from 'src/app/shared/base.component';
import { BreadcrumbService } from 'src/app/shared/layout/layout-main/navigation/breadcrumb/breadcrumb.service';


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
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent extends BaseComponent implements OnInit {


  productContexts = productContexts;

  @Select(AggregatorsState.aggregatorMemberTenant)
  aggregatorMemberTenant$: Observable<{user: UserStateModel, tenant: TenantStateModel}>;

  constructor(breadcrumbService: BreadcrumbService) {
    super();



    breadcrumbService.build('HOME', 'QUOTE', 'QUOTE_DASHBOARD');
  }


  ngOnInit() {
  }

}

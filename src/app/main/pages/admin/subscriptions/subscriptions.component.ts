import { ProductService } from 'src/app/main/services/product/product.service';
import { Component, OnInit } from '@angular/core';
import { Select } from '@ngxs/store';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';
import { Observable, Subscription } from 'rxjs';
import { NavigationItemIds } from 'src/app/main/main.navigation';
import { AggregatorsState } from 'src/app/main/services/+state-aggregators/aggregators.state';
import { TenantStateModel } from 'src/app/main/services/tenant/tenant.models';
import { UserStateModel } from 'src/app/main/services/user/user.models';
import { BaseComponent } from 'src/app/shared/base.component';
import { BreadcrumbService } from 'src/app/shared/layout/layout-main/navigation/breadcrumb/breadcrumb.service';
import { DocumentChangeAction } from '@angular/fire/firestore';
import { IProductItem } from 'src/app/main/services/product/product.models';


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
  selector: 'app-subscriptions',
  templateUrl: './subscriptions.component.html',
  styleUrls: ['./subscriptions.component.scss']
})
export class AdminSubscriptionsComponent extends BaseComponent implements OnInit {


  productContexts = productContexts;

  @Select(AggregatorsState.aggregatorMemberTenant)
  aggregatorMemberTenant$: Observable<{user: UserStateModel, tenant: TenantStateModel}>;
  products: IProductItem[];
  products$$: Subscription;

  constructor(
    breadcrumbService: BreadcrumbService,
    private productService: ProductService
    ) {
    super();

    breadcrumbService.build(NavigationItemIds.HOME, NavigationItemIds.ADMIN, NavigationItemIds.ADMIN_SUBSCRIPTIONS);
  }


  async ngOnInit() {
    this.products$$ = this.productService.list().subscribe(res => {
      this.products = res.map(_ => _.payload.doc.data());
    });
  }

}

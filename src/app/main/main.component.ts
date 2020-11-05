import { Store } from '@ngxs/store';
import { Component, OnInit } from '@angular/core';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';
import { BaseComponent } from '../shared/base.component';
import { BreadCrumbItem, BreadcrumbService } from '../shared/layout/layout-main/breadcrumb/breadcrumb.service';
import { TenantService } from './services/tenant/tenant.service';
import { UserService } from './services/user/user.service';
import { TenantGetAction } from './services/tenant/states/tenant.state';

@AutoUnsubscribe()
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent extends BaseComponent implements OnInit {

  constructor(
    private store: Store,
    breadcrumbService: BreadcrumbService
  ) {
    super();


    breadcrumbService.addItem({
      id: 'HOME',
      label: 'Home',
      routerLink: ['/app'],
      icon: 'home'
    } as BreadCrumbItem);

    breadcrumbService.build('HOME');
  }


  ngOnInit() {
  }

}

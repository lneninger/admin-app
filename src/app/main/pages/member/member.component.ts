import { Component, OnInit } from '@angular/core';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';
import { BaseComponent } from 'src/app/shared/base.component';
import { BreadCrumbItem, BreadcrumbService } from 'src/app/shared/layout/layout-main/breadcrumb/breadcrumb.service';

const productContexts = [
  {
    id: 1,
    name: 'Community',
    stage: 'Eligibility',
    icon: 'fa-address-card',
    fontSet: 'far',
    notifications: true
  },
  {
    id: 2,
    name: 'Medicaid',
    stage: 'Eligibility',
    icon: 'fa-handshake',
    fontSet: 'far',
    notifications: false
  },
  {
    id: 3,
    name: 'LIS',
    stage: 'Eligibility',
    icon: 'fa-dollar-sign',
    fontSet: 'fas',
    notifications: false
  },
  {
    id: 4,
    name: 'SNAP',
    stage: 'Eligibility',
    icon: 'fa-utensils',
    fontSet: 'fas',
    notifications: true
  },
  {
    id: 5,
    name: 'Veteran',
    stage: 'ENGAGEMENT',
    icon: 'fa-flag-usa',
    fontSet: 'fas',
    notifications: true
  }
];

@AutoUnsubscribe()
@Component({
  selector: 'app-member',
  templateUrl: './member.component.html',
  styleUrls: ['./member.component.scss']
})
export class MemberComponent extends BaseComponent implements OnInit {

  productContexts = productContexts;

  constructor(breadcrumbService: BreadcrumbService) {
    super();

    breadcrumbService.addItem({
      id: 'MEMBER',
      label: 'Member',
      routerLink: ['/app/member'],
      icon: 'fa-id-card',
      fontSet: 'far'
    } as BreadCrumbItem);

    breadcrumbService.build('HOME', 'MEMBER');
  }


  ngOnInit() {
  }

}

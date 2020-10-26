import { Component, OnInit } from '@angular/core';
import { BreadCrumbItem, BreadcrumbService } from 'src/app/shared/layout/layout-main/breadcrumb/breadcrumb.service';


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

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {


  productContexts = productContexts;

  constructor(breadcrumbService: BreadcrumbService) {
    breadcrumbService.addItem({
      id: 'MEMBER_DASHBOARD',
      label: 'Dashboard',
      routerLink: ['/app/member/dashboard'],
      icon: 'dashboard'
    } as BreadCrumbItem);

    breadcrumbService.build('HOME', 'MEMBER', 'MEMBER_DASHBOARD');
  }


  ngOnInit() {
  }

}

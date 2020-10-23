import { Component, OnInit } from '@angular/core';
import { BreadCrumbItem, BreadcrumbService } from 'src/app/shared/layout/layout-main/breadcrumb/breadcrumb.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(breadcrumbService: BreadcrumbService) {
    breadcrumbService.addItem({
      id: 'DASHBOARD',
      label: 'Dashboard',
      routerLink: ['/app/dashboard'],
      icon: 'dashboard'
    } as BreadCrumbItem);

    breadcrumbService.build('HOME', 'DASHBOARD');
  }

  ngOnInit() {
  }

}

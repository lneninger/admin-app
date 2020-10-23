import { BreadCrumbItem, BreadcrumbService } from './../../../shared/layout/layout-main/breadcrumb/breadcrumb.service';
import { Component, OnInit } from '@angular/core';

@Component({
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  constructor(breadcrumbService: BreadcrumbService) {
    breadcrumbService.addItem({
      id: 'ABOUT',
      label: 'About',
      routerLink: ['/app/about'],
      icon: 'business_center'
    } as BreadCrumbItem);

    breadcrumbService.build('HOME', 'ABOUT');
  }

  ngOnInit() {
  }

}

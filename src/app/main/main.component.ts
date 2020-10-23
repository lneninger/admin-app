import { Component, OnInit } from '@angular/core';
import { BreadCrumbItem, BreadcrumbService } from '../shared/layout/layout-main/breadcrumb/breadcrumb.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  constructor(breadcrumbService: BreadcrumbService) {
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

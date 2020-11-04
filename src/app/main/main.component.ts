import { Component, OnInit } from '@angular/core';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';
import { BaseComponent } from '../shared/base.component';
import { BreadCrumbItem, BreadcrumbService } from '../shared/layout/layout-main/breadcrumb/breadcrumb.service';
import { UserService } from './services/user/user.service';

@AutoUnsubscribe()
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent extends BaseComponent implements OnInit {

  constructor(
    public userService: UserService,
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

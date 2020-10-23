import { Component, OnInit } from '@angular/core';
import { BreadCrumbItem, BreadcrumbService } from 'src/app/shared/layout/layout-main/breadcrumb/breadcrumb.service';

@Component({
  selector: 'app-member',
  templateUrl: './member.component.html',
  styleUrls: ['./member.component.scss']
})
export class MemberComponent implements OnInit {

  constructor(breadcrumbService: BreadcrumbService) {
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

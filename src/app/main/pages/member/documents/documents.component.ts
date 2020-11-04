import { Component, OnInit } from '@angular/core';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';
import { BaseComponent } from 'src/app/shared/base.component';
import { BreadCrumbItem, BreadcrumbService } from 'src/app/shared/layout/layout-main/breadcrumb/breadcrumb.service';

@AutoUnsubscribe()
@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.scss']
})
export class DocumentsComponent extends BaseComponent implements OnInit {


  constructor(breadcrumbService: BreadcrumbService) {
    super();

    breadcrumbService.addItem({
      id: 'MEMBER_DOCUMENTS',
      label: 'Documents',
      routerLink: ['/app/member/documents'],
      icon: 'attach_file',
    } as BreadCrumbItem);

    breadcrumbService.build('HOME', 'MEMBER', 'MEMBER_DOCUMENTS');
  }


  ngOnInit(): void {
  }

}

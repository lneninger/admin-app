import { Component, OnInit } from '@angular/core';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';
import { BaseComponent } from 'src/app/shared/base.component';
import { BreadCrumbItem, BreadcrumbService } from 'src/app/shared/layout/layout-main/breadcrumb/breadcrumb.service';

@AutoUnsubscribe()
@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss']
})
export class NotesComponent extends BaseComponent implements OnInit {

  constructor(breadcrumbService: BreadcrumbService) {
    super();

    breadcrumbService.addItem({
      id: 'MEMBER_NOTES',
      label: 'Notes',
      routerLink: ['/app/member/notes'],
      icon: 'note',
    } as BreadCrumbItem);

    breadcrumbService.build('HOME', 'MEMBER', 'MEMBER_NOTES');
  }

  ngOnInit(): void {
  }

}

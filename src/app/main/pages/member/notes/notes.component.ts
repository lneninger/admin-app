import { Component, OnInit } from '@angular/core';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';
import { NavigationItemIds } from 'src/app/main/main.navigation';
import { BaseComponent } from 'src/app/shared/base.component';
import { BreadcrumbService } from 'src/app/shared/layout/layout-main/navigation/breadcrumb/breadcrumb.service';

@AutoUnsubscribe()
@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss']
})
export class NotesComponent extends BaseComponent implements OnInit {

  constructor(breadcrumbService: BreadcrumbService) {
    super();

    breadcrumbService.build(NavigationItemIds.HOME, NavigationItemIds.MEMBER, NavigationItemIds.MEMBER_NOTES);
  }

  ngOnInit(): void {
  }

}

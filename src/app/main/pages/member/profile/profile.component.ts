import { Component, OnInit } from '@angular/core';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';
import { NavigationItemIds } from 'src/app/main/main.navigation';
import { BaseComponent } from 'src/app/shared/base.component';
import { BreadcrumbService } from 'src/app/shared/layout/layout-main/navigation/breadcrumb/breadcrumb.service';

@AutoUnsubscribe()
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent extends BaseComponent implements OnInit {

  constructor(breadcrumbService: BreadcrumbService) {
    super();

    breadcrumbService.build(NavigationItemIds.HOME, NavigationItemIds.MEMBER, NavigationItemIds.MEMBER_PROFILE);
  }

  ngOnInit(): void {
  }

}

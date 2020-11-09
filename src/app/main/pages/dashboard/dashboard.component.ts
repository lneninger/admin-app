import { Component, OnInit } from '@angular/core';
import { BreadcrumbService } from 'src/app/shared/layout/layout-main/navigation/breadcrumb/breadcrumb.service';
import { NavigationItemIds } from '../../main.navigation';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(breadcrumbService: BreadcrumbService) {

    breadcrumbService.build(NavigationItemIds.HOME, NavigationItemIds.DASHBOARD);
  }

  ngOnInit() {
  }

}

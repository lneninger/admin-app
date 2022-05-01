import { Component, OnInit } from '@angular/core';
import { map, timer, Subscription } from 'rxjs';
import { BreadcrumbService } from 'src/app/shared/layout/layout-main/navigation/breadcrumb/breadcrumb.service';
import { NavigationItemIds } from '../../main.navigation';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  items: number[];
  subscription$$: Subscription;

  constructor(breadcrumbService: BreadcrumbService) {

    breadcrumbService.build(NavigationItemIds.HOME, NavigationItemIds.DASHBOARD);
  }

  ngOnInit() {
    this.subscription$$ = timer(1000).pipe(map(_ => {
      return [1,2,3,4];
    })).subscribe(_ => {
      this.items = _;
    });
  }

}

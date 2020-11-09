import { Component, OnInit } from '@angular/core';
import { BreadcrumbService } from 'src/app/shared/layout/layout-main/navigation/breadcrumb/breadcrumb.service';
import { NavigationItemIds } from '../../main.navigation';

@Component({
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  constructor(breadcrumbService: BreadcrumbService) {

    breadcrumbService.build(NavigationItemIds.HOME, NavigationItemIds.ABOUT);
  }

  ngOnInit() {
  }

}

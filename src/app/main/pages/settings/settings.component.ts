import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';
import { QuoteService } from 'src/app/main/services/quote/quote.service';
import { BaseComponent } from 'src/app/shared/base.component';
import { BreadcrumbService } from 'src/app/shared/layout/layout-main/navigation/breadcrumb/breadcrumb.service';
import { environment } from 'src/environments/environment';

import { NavigationItemIds } from '../../main.navigation';
import { AppMenuService } from '../../shared/menu/app-menu.service';


@AutoUnsubscribe()
@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent extends BaseComponent implements OnInit {

  constructor(
    private breadcrumbService: BreadcrumbService,
    private menuService: AppMenuService,
    private titleService: Title,
    private route: ActivatedRoute,
    private service: QuoteService
  ) {
    super();
  }

  ngOnInit() {
    this.titleService.setTitle(`${environment.appTitle} - Settings`);

    this.breadcrumbService.build(NavigationItemIds.HOME, NavigationItemIds.SETTINGS);
  }

}

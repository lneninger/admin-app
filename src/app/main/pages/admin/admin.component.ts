import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';
import { QuoteService } from 'src/app/main/services/quote/quote.service';
import { BaseComponent } from 'src/app/shared/base.component';
import { BreadcrumbService } from 'src/app/shared/layout/layout-main/navigation/breadcrumb/breadcrumb.service';
import { environment } from 'src/environments/environment';

import { NavigationItemIds } from '../../main.navigation';
import { Quote } from '../../services/quote/quote.models';
import { AppMenuService } from '../../shared/menu/app-menu.service';


@AutoUnsubscribe()
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent extends BaseComponent implements OnInit {
  quote: Quote;


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
    this.titleService.setTitle(`${environment.appTitle} - Admin`);

    this.breadcrumbService.build(NavigationItemIds.HOME, NavigationItemIds.ADMIN);
  }

}

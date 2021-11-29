import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';
import { QuoteService } from 'src/app/main/services/quote/quote.service';
import { BaseComponent } from 'src/app/shared/base.component';
import { BreadcrumbService } from 'src/app/shared/layout/layout-main/navigation/breadcrumb/breadcrumb.service';
import { NavigationItem } from 'src/app/shared/layout/layout-main/navigation/navigation.service';
import { environment } from 'src/environments/environment';

import { NavigationItemIds } from '../../main.navigation';
import { Quote } from '../../services/quote/quote.models';
import { AppMenuService } from '../../shared/menu/app-menu.service';


@AutoUnsubscribe()
@Component({
  selector: 'app-quote',
  templateUrl: './quote.component.html',
  styleUrls: ['./quote.component.scss']
})
export class QuoteComponent extends BaseComponent implements OnInit {
  quote: Quote;


  constructor(
    private breadcrumbService: BreadcrumbService,
    private menuService: AppMenuService,
    private titleService: Title,
    private route: ActivatedRoute,
    private service: QuoteService
  ) {
    super();

    this.quote = route.snapshot.data.quote as Quote;


  }

  ngOnInit() {
    this.titleService.setTitle(`${environment.appTitle} - ${this.quote.description}`);

    this.breadcrumbService.build(NavigationItemIds.HOME, NavigationItemIds.QUOTES, NavigationItemIds.QUOTE_EDIT);
    this.breadcrumbService.updateItems({ label: this.quote.description }, [NavigationItemIds.QUOTE_EDIT]);
    this.menuService.service.updateItems((item: NavigationItem) => {
      return ({ routerLink: item.routerLink.map(linkItem => linkItem.replace('{id}', this.quote.id)) });
  }, [NavigationItemIds.QUOTE_EDIT, NavigationItemIds.QUOTE_DOCUMENTS]);
  }

}

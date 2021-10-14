import { QuoteService } from 'src/app/main/services/quote/quote.service';
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Select } from '@ngxs/store';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { BaseComponent } from 'src/app/shared/base.component';
import { DataRetrieverInput, GridConfig } from 'src/app/shared/grid/grid-config';
import { BreadcrumbService } from 'src/app/shared/layout/layout-main/navigation/breadcrumb/breadcrumb.service';
import { NavigationItem } from 'src/app/shared/layout/layout-main/navigation/navigation.service';
import { environment } from 'src/environments/environment';
import { NavigationItemIds } from '../../main.navigation';
import { MemberWrapperModel } from '../../services/member/states/member.models';
import { IQuoteItem, Quote } from '../../services/quote/quote.models';
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

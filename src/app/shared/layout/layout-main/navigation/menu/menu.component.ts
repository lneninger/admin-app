import { NavigationItemIds } from 'src/app/main/main.navigation';
import { NavigationItem } from './../navigation.service';
import { MenuService } from './menu.service';
import { Component, OnInit, ChangeDetectionStrategy, HostBinding } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Select } from '@ngxs/store';
import { AppConfigState, AppConfigStateMenuModel } from '../../../states/appconfig.state';
import { AggregatorsState } from 'src/app/main/services/+state-aggregators/aggregators.state';

export interface Section {
  type?: 'divider';
  name?: string;
  label?: string;
  description?: string;
  updated?: Date;
  routerLink?: any;
  icon?: string;
  iconFontSet?: string;
}

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MenuComponent implements OnInit {

items: NavigationItem[];

  @Select(AppConfigState.menu)
  menuConfig$: Observable<AppConfigStateMenuModel>;
  menuConfig$$: Subscription;
  menuConfig: AppConfigStateMenuModel;

  @Select(AggregatorsState.aggregatorMemberTenantUser)
  aggregatorMemberTenantUser$: Observable<{memberState, tenantState, userState}>;

  expanded$$: Subscription;
  aggregatorMemberTenantUser$$: Subscription;
  @HostBinding('class')
  get expanded(): string {
    return this.menuConfig && this.menuConfig.expanded ? 'expanded' : 'collapsed';
  }




  constructor(public service: MenuService) { }

  ngOnInit() {
    this.initializeMenuConfigListener();
    this.initializeMenuItemsListener();
  }
  initializeMenuConfigListener() {
    this.menuConfig$$ = this.menuConfig$.subscribe(menuConfig => {
      // debugger;
      this.menuConfig = menuConfig;
    });



  }

  initializeMenuItemsListener() {
    this.aggregatorMemberTenantUser$$ = this.aggregatorMemberTenantUser$.subscribe(menuConfig => {
      this.items = this.service.build(
          NavigationItemIds.DASHBOARD,
          NavigationItemIds.DIVIDER,
          NavigationItemIds.MEMBER_COMMUNITY,
          NavigationItemIds.MEMBER_MEDICAID,
          NavigationItemIds.MEMBER_SNAP,
          NavigationItemIds.MEMBER_LIS,
          NavigationItemIds.MEMBER_VETERAN,
          NavigationItemIds.DIVIDER,
          NavigationItemIds.MEMBER_PROFILE,
          NavigationItemIds.MEMBER_DOCUMENTS,
          NavigationItemIds.MEMBER_NOTES,
          NavigationItemIds.DIVIDER,
          NavigationItemIds.MEMBER_CUSTOM_INTERVIEW,
          NavigationItemIds.DIVIDER,
          NavigationItemIds.MEMBER_NOTES,
      )
    });



  }

}

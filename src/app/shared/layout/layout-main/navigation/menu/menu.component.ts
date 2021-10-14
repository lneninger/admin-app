import { AppMenuService } from './../../../../../main/shared/menu/app-menu.service';
import { NavigationItemIds } from 'src/app/main/main.navigation';
import { NavigationItem } from './../navigation.service';
import { MenuService } from './menu.service';
import { Component, OnInit, ChangeDetectionStrategy, HostBinding } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Select } from '@ngxs/store';
import { AppConfigState, AppConfigStateMenuModel } from '../../../states/appconfig.state';

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
})
export class MenuComponent implements OnInit {


  @Select(AppConfigState.menu)
  menuConfig$: Observable<AppConfigStateMenuModel>;
  menuConfig$$: Subscription;
  menuConfig: AppConfigStateMenuModel;



  expanded$$: Subscription;
  aggregatorMemberTenantUser$$: Subscription;
  @HostBinding('class.expanded')
  get expanded() {
    return this.menuConfig && this.menuConfig.expanded;
  }

  @HostBinding('class.collapsed')
  get collapsed() {
    return !this.menuConfig || !this.menuConfig.expanded;
  }

  constructor(
    public service: MenuService,
    public appService: AppMenuService
    ) { }

  ngOnInit() {
    this.initializeMenuConfigListener();
  }

  initializeMenuConfigListener() {
    this.menuConfig$$ = this.menuConfig$.subscribe(menuConfig => {
      // debugger;
      this.menuConfig = menuConfig;
    });
  }
}


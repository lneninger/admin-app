import { MenuService } from './menu.service';
import { Component, OnInit, ChangeDetectionStrategy, HostBinding } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { AppConfigState, AppConfigStateMenuModel } from 'src/app/shared/states/appconfig.state';
import { Select } from '@ngxs/store';

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



  @Select(AppConfigState.menu)
  menu$: Observable<AppConfigStateMenuModel>;
  menu$$: Subscription;
  menu: AppConfigStateMenuModel;

  expanded$$: Subscription;
  @HostBinding('class')
  get expanded(): string {
    return this.menu && this.menu.expanded ? 'expanded' : 'collapsed';
  }

  items: Section[] = [

    {
      name: 'Dashboard',
      icon: 'dashboard',
      routerLink: ['/app/dashboard']
    },
    {
      type: 'divider'
    },
    {
      name: 'Community',
      icon: 'fa-address-card',
      iconFontSet: 'far'
    },
    {
      name: 'Medicaid',
      icon: 'fa-handshake',
      iconFontSet: 'far'
    },
    {
      name: 'SNAP',
      icon: 'fa-utensils',
      iconFontSet: 'fas'
    },

    {
      name: 'LIS',
      icon: 'fa-dollar-sign',
      iconFontSet: 'fas'
    },
    {
      type: 'divider'
    },
    {
      name: 'Profile',
      icon: 'fa-id-card-alt',
      iconFontSet: 'fas'
    },

    {
      name: 'Documents',
      icon: 'attach_file'
    },
    {
      name: 'Notes',
      icon: 'note'
    },
    {
      type: 'divider'
    },
    {
      name: 'Interview',
      icon: 'fa-tasks',
      iconFontSet: 'fas'
    },
    {
      type: 'divider'
    },
    {
      name: 'Search',
      icon: 'search',
      routerLink: ['/app/search']
    }
  ];


  constructor(public service: MenuService) { }

  ngOnInit() {
    this.initializeMenuListener();
  }
  initializeMenuListener() {
    this.menu$$ = this.menu$.subscribe(menu => {
      // debugger;
      this.menu = menu;
    });
  }

}

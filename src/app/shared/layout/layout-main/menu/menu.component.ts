import { MenuService } from './menu.service';
import { Component, OnInit, ChangeDetectionStrategy, HostBinding } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { AppConfigState, AppConfigStateMenuModel } from 'src/app/shared/states/appconfig.state';
import { Select } from '@ngxs/store';

export interface Section {
  type?: 'divider';
  name?: string;
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
      updated: new Date('1/17/16'),
      icon: 'dashboard',
      routerLink: ['/app/member/dashboard']
    },
    {
      type: 'divider'
    },
    {
      name: 'Community',
      updated: new Date('1/28/16'),
      icon: 'fa-address-card',
      iconFontSet: 'far'
    },
    {
      name: 'Medicaid',
      updated: new Date('1/28/16'),
      icon: 'fa-handshake',
      iconFontSet: 'far'
    },
    {
      name: 'SNAP',
      updated: new Date('1/28/16'),
      icon: 'fa-utensils',
      iconFontSet: 'fas'
    },

    {
      name: 'LIS',
      updated: new Date('1/28/16'),
      icon: 'fa-dollar-sign',
      iconFontSet: 'fas'
    },
    {
      type: 'divider'
    },
    {
      name: 'Profile',
      updated: new Date('1/28/16'),
      icon: 'fa-id-card-alt',
      iconFontSet: 'fas'
    },

    {
      name: 'Documents',
      updated: new Date('2/20/16'),
      icon: 'attach_file'
    },
    {
      name: 'Notes',
      updated: new Date('2/20/16'),
      icon: 'note'
    },
    {
      type: 'divider'
    },
    {
      name: 'Interview',
      updated: new Date('2/20/16'),
      icon: 'fa-tasks',
      iconFontSet: 'fas'
    },
    {
      type: 'divider'
    },
    {
      name: 'Kitchen Remodel',
      updated: new Date('1/18/16'),
      icon: 'search'
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

import { MenuService } from './menu.service';
import { Component, OnInit, ChangeDetectionStrategy, HostBinding } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { AppConfigState, AppConfigStateMenuModel } from 'src/app/shared/states/appconfig.state';
import { Select } from '@ngxs/store';

export interface Section {
  type?: 'divider';
  name?: string;
  updated?: Date;
  icon?: string;
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
      name: 'Photos',
      updated: new Date('1/1/16'),
      icon: 'extension'
    },
    {
      name: 'Recipes',
      updated: new Date('1/17/16'),
      icon: 'dashboard'
    },
    {
      name: 'Work',
      updated: new Date('1/28/16'),
      icon: 'code'
    },
    {
      type: 'divider'
    },
    {
      name: 'Vacation Itinerary',
      updated: new Date('2/20/16'),
      icon: 'code'
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

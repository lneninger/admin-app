import { AppConfigStateMenuModel, AppConfigOptionsModel } from './../../states/appconfig.state';
import { MediaService } from './../../common/media.service';
import { MediaObserver } from '@angular/flex-layout';
import { Component, OnInit, ChangeDetectionStrategy, ViewChild, AfterViewInit } from '@angular/core';
import { MatDrawer, MatDrawerContainer } from '@angular/material';
import { MenuService } from './menu/menu.service';
import { environment } from 'src/environments/environment';
import { Select } from '@ngxs/store';
import { Observable, Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { AppConfigState } from '../../states/appconfig.state';
import { Router } from '@angular/router';

@Component({
  selector: 'app-layout-main',
  templateUrl: './layout-main.component.html',
  styleUrls: ['./layout-main.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LayoutMainComponent implements OnInit, AfterViewInit {

  @ViewChild('drawer', { static: true })
  drawer: MatDrawer;

  @ViewChild('drawerOptions', { static: true })
  drawerOptions: MatDrawer;


  @Select(AppConfigState.menu)
  menu$: Observable<AppConfigStateMenuModel>;
  menu$$: Subscription;

  @Select(AppConfigState.options)
  options$: Observable<AppConfigOptionsModel>;
  options$$: Subscription;

  constructor(
    public menuService: MenuService,
    private mediaService: MediaService,
    private mediaObserver: MediaObserver,
    private router: Router
  ) {
    this.initializeMedia();
  }


  async ngOnInit() {
    this.initializeMenuListener();
    this.initializeOptionsListener();

  }
  initializeMenuListener() {
    this.menu$$ = this.menu$.subscribe(menu => {
      // debugger;
      if (menu.show) {
        this.drawer.open();
      } else {
        this.drawer.close();
      }

    });
  }

  initializeOptionsListener() {
    this.options$$ = this.options$.pipe(switchMap(options => {
      if (options && options.expanded) {
        return new Observable<AppConfigOptionsModel>(observer => {
          this.drawerOptions.open().then(() => observer.next(options));
        });
      } else {
        return new Observable<AppConfigOptionsModel>(observer => {
          this.drawerOptions.close().then(() => observer.next(options));
        });
      }
    })).subscribe(options => {
      // debugger;
      if (options && options.expanded) {
        this.router.navigate(['/app', { outlets: { options: options.current } }], { skipLocationChange: true });
      }
    });
  }

  ngAfterViewInit() {
    this.menuService.initialize(this.drawer, this.drawerOptions);
  }

  initializeMedia() {
    // debugger;
    this.mediaService.initialize(this.mediaObserver);
  }


}

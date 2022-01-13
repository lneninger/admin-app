import { LazyLoaderService } from './../../lazy-loader/lazy-loader.service';
import { AppConfigStateMenuModel, AppConfigOptionsModel } from '../states/appconfig.state';
import { MediaService } from './../../common/media.service';
import { MediaObserver } from '@angular/flex-layout';
import { Component, OnInit, ChangeDetectionStrategy, ViewChild, AfterViewInit, QueryList, ViewChildren, ContentChild, TemplateRef } from '@angular/core';
import { MatDrawer, MatDrawerContainer } from '@angular/material/sidenav';
import { Select } from '@ngxs/store';
import { BehaviorSubject, combineLatest, Observable, Subscription } from 'rxjs';
import { delay, filter, switchMap, tap } from 'rxjs/operators';
import { AppConfigState } from '../states/appconfig.state';
import { Router } from '@angular/router';
import { LazyLoaderDirective } from '../../lazy-loader/lazy-loader.module';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';
import { BaseComponent } from '../../base.component';
import { MenuService } from './navigation/menu/menu.service';
import { LazyLoaderBaseComponent } from '../../lazy-loader/lazy-loader.component';

@AutoUnsubscribe()
@Component({
  selector: 'app-layout-main',
  templateUrl: './layout-main.component.html',
  styleUrls: ['./layout-main.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  // : { '[class]': 'app-wrapper' }
})
export class LayoutMainComponent extends LazyLoaderBaseComponent implements OnInit, AfterViewInit {
  elem: HTMLElement;

  lazyLoaderSubscription: Subscription;
  private lazyLoaderDirectivesInternal$ = new BehaviorSubject<LazyLoaderDirective[]>(null);
  private lazyLoaderDirectivesInternal: QueryList<LazyLoaderDirective>;
  @ViewChildren(LazyLoaderDirective)
  set lazyLoaderDirectives(value: QueryList<LazyLoaderDirective>) {
    this.lazyLoaderDirectivesInternal = value;
    const currentDirectives = this.lazyLoaderDirectivesInternal$.value;
    if (this.lazyLoaderDirectivesInternal) {
      const directiveArray = this.lazyLoaderDirectivesInternal.map(x => x);
      this.lazyLoaderDirectivesInternal$.next(directiveArray);
    }
  }
  get lazyLoaderDirectives() {
    return this.lazyLoaderDirectivesInternal;
  }

  @ViewChild('drawer', { static: false })
  drawer: MatDrawer;

  @ViewChild('drawerOptions', { static: true })
  drawerOptions: MatDrawer;

  @ContentChild('toolbarOptions', { static: true })
  toolbarOptions: TemplateRef<any>;


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
    private router: Router,
    lazyLoaderService: LazyLoaderService
  ) {
    super(lazyLoaderService);
    this.initializeMedia();
  }


  async ngOnInit() {

  }

  async ngAfterViewInit() {
      this.elem = document.documentElement;
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
    })).subscribe();
  }


  initializeMedia() {
    // debugger;
    this.mediaService.initialize(this.mediaObserver);
  }



}

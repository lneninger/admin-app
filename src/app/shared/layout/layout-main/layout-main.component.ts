import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  OnInit,
  QueryList,
  TemplateRef,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { MediaObserver } from '@angular/flex-layout';
import { MatDrawer } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { Select } from '@ngxs/store';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { LazyLoaderBaseComponent } from '../../lazy-loader/lazy-loader.component';
import { LazyLoaderDirective } from '../../lazy-loader/lazy-loader.module';
import { AppConfigOptionsModel, AppConfigState, AppConfigStateMenuModel } from '../states/appconfig.state';
import { MediaService } from './../../common/media.service';
import { LazyLoaderService } from './../../lazy-loader/lazy-loader.service';
import { MenuService } from './navigation/menu/menu.service';

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

  side = 'side';

  async ngOnInit() {

  }


  async ngAfterViewInit() {
    setTimeout(() => {
      super.ngAfterViewInit();
      this.elem = document.documentElement;
      this.initializeMenuListener();
      this.initializeOptionsListener();
    });

  }

  initializeMenuListener() {
    this.menu$$ = this.menu$.subscribe(menu => {
      if (menu.show) {
        this.drawer.open();
      } else {
        this.drawer.close();
      }

      this.drawer.mode = menu.mode;
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

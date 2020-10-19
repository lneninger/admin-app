import { Injectable } from '@angular/core';
import { MediaObserver } from '@angular/flex-layout';
import { MatDrawer, MatDrawerContainer } from '@angular/material';
import { Select, State, Store } from '@ngxs/store';
import { BehaviorSubject, Observable } from 'rxjs';
import { MediaService } from 'src/app/shared/common/media.service';
import { AppConfigState, AppConfigStateMenuModel, MenuExpandedToggleAction, MenuToggleAction } from 'src/app/shared/states/appconfig.state';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  private showMenuInternal$ = new BehaviorSubject<boolean>(false);
  showMenu$ = this.showMenuInternal$.asObservable();
  private menuDrawer: MatDrawer;
  private optionsDrawer: MatDrawer;

  menuFloatInternal$ = new BehaviorSubject<boolean>(false);

  fullScreenInternal$ = new BehaviorSubject<boolean>(false);

  // private expandedInternal$ = new BehaviorSubject<boolean>(false);
  // expanded$ = this.expandedInternal$.asObservable();

  @Select(AppConfigState.menu)
  menu$: Observable<AppConfigStateMenuModel>;

  constructor(private store: Store, private configState: AppConfigState, private mediaService: MediaService) {

  }

  initialize(menuDrawer: MatDrawer, optionsDrawer: MatDrawer) {
    // this.menuDrawer = menuDrawer;
    // this.optionsDrawer = optionsDrawer;

    // this.initializeStateListeners();
  }
  // initializeStateListeners() {
  //   this.menu$.subscribe(menu => {
  //     // debugger;
  //     if (menu.show) {
  //       this.menuDrawer.open();
  //     } else {
  //       this.menuDrawer.close();
  //     }

  //     if (menu.expanded) {
  //       this.optionsDrawer.open();
  //     } else {
  //       this.optionsDrawer.close();
  //     }
  //   });
  // }


  toggleMenu() {
    this.store.dispatch(new MenuToggleAction());
  }

  toggleExpanded() {
    this.store.dispatch(new MenuExpandedToggleAction());
  }

  toggleFloat() {
    let current = this.menuFloatInternal$.value;
    current = !current;
    this.menuFloatInternal$.next(current);
  }

  toggleFullScreen() {
    let current = this.fullScreenInternal$.value;
    current = !current;
    this.fullScreenInternal$.next(current);
  }


}

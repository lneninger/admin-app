import { Injectable } from '@angular/core';
import { MediaObserver } from '@angular/flex-layout';
import { MatDrawer, MatDrawerContainer } from '@angular/material/sidenav';
import { Select, State, Store } from '@ngxs/store';
import { BehaviorSubject, Observable } from 'rxjs';
import { NavigationItemIds } from 'src/app/main/main.navigation';
import { MediaService } from 'src/app/shared/common/media.service';
import { AppConfigState, AppConfigStateMenuModel, MenuToggleAction, MenuExpandedToggleAction } from '../../../states/appconfig.state';
import { NavigationItem, NavigationService } from '../navigation.service';


export declare type PatchTypeFunction = (item: NavigationItem) => Partial<NavigationItem>;
export declare type PatchType = Partial<NavigationItem> | PatchTypeFunction;
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

  @Select(AppConfigState.menu)
  menu$: Observable<AppConfigStateMenuModel>;

  _currentMenu: NavigationItem[];
  set currentMenu(value: NavigationItem[]) {
    this._currentMenu = value;
    console.info(`set currentMenu => `, value);
  }
  get currentMenu() {
    return this._currentMenu;
  }


  get currentMenuTop() {
    return this._currentMenu && this._currentMenu.filter(item => !item.bottom);
  }

  get currentMenuBottom() {
    return this._currentMenu && this._currentMenu.filter(item => item.bottom);
  }


  constructor(
    private navigationService: NavigationService,
    private store: Store,
    private configState: AppConfigState,
    private mediaService: MediaService
  ) {

  }

  initialize(menuDrawer: MatDrawer, optionsDrawer: MatDrawer) {

  }


  build(...ids: string[]) {
    return this.navigationService.build(...ids);
  }

  buildCurrentMenu(...ids: string[]) {
    this.currentMenu = this.navigationService.build(...ids);
  }

  updateItems(patch: PatchType, ids: NavigationItemIds[]) {
    ids.forEach(id => {
      const index = this.currentMenu.findIndex(item => item.id === id);
      if (index >= 0) {
        let formatted: Partial<NavigationItem>;
        if (typeof (patch) === 'function') {
          formatted = (patch as PatchTypeFunction)(this.currentMenu[index]);
        } else {
          formatted = patch as Partial<NavigationItem>;
        }
        this.currentMenu.splice(index, 1, { ...this.currentMenu[index], ...formatted });
      }
    });


  }


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

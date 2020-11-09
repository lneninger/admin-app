import { Injectable } from '@angular/core';
import { MediaObserver } from '@angular/flex-layout';
import { MatDrawer, MatDrawerContainer } from '@angular/material/sidenav';
import { Select, State, Store } from '@ngxs/store';
import { BehaviorSubject, Observable } from 'rxjs';
import { NavigationItemIds } from 'src/app/main/main.navigation';
import { MediaService } from 'src/app/shared/common/media.service';
import { AppConfigState, AppConfigStateMenuModel, MenuToggleAction, MenuExpandedToggleAction } from '../../../states/appconfig.state';
import { NavigationItem, NavigationService } from '../navigation.service';

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

  updateItem(items: NavigationItem[], id: NavigationItemIds, patch: Partial<NavigationItem>) {
    const index = items.findIndex(item => item.id === id);
    items.splice(index, 1, {...items[index], ...patch});

    return items;
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

import { NavigationItemIds } from 'src/app/main/main.navigation';
import { AggregatorsState } from 'src/app/main/services/+state-aggregators/aggregators.state';
import { ActivatedRoute, ActivatedRouteSnapshot, Router, Event, NavigationEnd } from '@angular/router';
import { Injectable } from '@angular/core';
import { MenuService } from 'src/app/shared/layout/layout-main/navigation/menu/menu.service';
import { Observable, Subscription } from 'rxjs';
import { Select } from '@ngxs/store';
import { filter, first } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AppMenuService {

  @Select(AggregatorsState.aggregatorMemberTenantUser)
  aggregatorMemberTenantUser$: Observable<{ memberState, tenantState, userState }>;
  aggregatorMemberTenantUser$$: Subscription;
  currentMenuName: any;

  constructor(
    public service: MenuService,
    public route: ActivatedRoute,
    private router: Router
  ) {

    this.initializeListener();
  }


  initializeListener() {
    this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe(async (event: Event) => {
      const routeSnapshot = this.firstChild(this.route.snapshot);
      let currentMenuName = this.getMenuName(routeSnapshot);
      currentMenuName = currentMenuName && currentMenuName.toUpperCase();
      if (!this.currentMenuName || this.currentMenuName != currentMenuName) {
        this.currentMenuName = currentMenuName;
        switch (this.currentMenuName) {

          case 'QUOTE':
            await this.generateQuoteMenu();
            break;
          case 'NEW-QUOTE':
            await this.generateNewQuoteMenu();
            break;

            case 'SPECIALIST':
              await this.generateSpecialistMenu();
              break;
            case 'NEW-SPECIALIST':
              await this.generateNewSpecialistMenu();
              break;



            case 'ADMIN':
            await this.generateAdminMenu();
            break;
            case 'SETTINGS':
            await this.generateSettingsMenu();
            break;
          default:
            await this.generateGlobalMenu();
            break;
        }
      }
    });
  }


  async generateGlobalMenu() {
    const agreggated = await this.aggregatorMemberTenantUser$.pipe(first()).toPromise();
    this.service.buildCurrentMenu(
      NavigationItemIds.DASHBOARD,
      NavigationItemIds.DIVIDER,
      NavigationItemIds.QUOTES,
      NavigationItemIds.SPECIALISTS,
      NavigationItemIds.PRODUCT_CATEGORIES,
      NavigationItemIds.PRODUCTS,
      // NavigationItemIds.DIVIDER,
      // NavigationItemIds.QUOTE_CUSTOM_INTERVIEW,
      // NavigationItemIds.DIVIDER,
      // NavigationItemIds.QUOTE_NOTES,
      NavigationItemIds.ADMIN,
      NavigationItemIds.SETTINGS,
    );
    console.info(`ended await this.generateGlobalMenu() => `, this.service.currentMenu);

  }

  async generateNewQuoteMenu() {
    const agreggated = await this.aggregatorMemberTenantUser$.pipe(first()).toPromise();
    this.service.buildCurrentMenu(
      NavigationItemIds.DASHBOARD,

    );
    console.info(`ended await this.generateNewQuoteMenu() => `, this.service.currentMenu);
  }

  async generateQuoteMenu() {
    const agreggated = await this.aggregatorMemberTenantUser$.pipe(first()).toPromise();
    this.service.buildCurrentMenu(
      NavigationItemIds.HOME,
      NavigationItemIds.DIVIDER,
      NavigationItemIds.QUOTE_DASHBOARD,
      NavigationItemIds.DIVIDER,
      // NavigationItemIds.QUOTE_DOCUMENT,
      // NavigationItemIds.QUOTE_MEDICAID,
      // NavigationItemIds.QUOTE_SNAP,
      // NavigationItemIds.QUOTE_LIS,
      // NavigationItemIds.QUOTE_VETERAN,
      // NavigationItemIds.DIVIDER,
      NavigationItemIds.QUOTE_CALCULATE,
      NavigationItemIds.QUOTE_DOCUMENTS,
      NavigationItemIds.QUOTE_NOTES,
      // NavigationItemIds.DIVIDER,
      // NavigationItemIds.QUOTE_CUSTOM_INTERVIEW,
      // NavigationItemIds.DIVIDER,
      NavigationItemIds.ADMIN,
    );
    console.info(`ended await this.generateQuoteMenu() => `, this.service.currentMenu);
  }




  async generateNewSpecialistMenu() {
    const agreggated = await this.aggregatorMemberTenantUser$.pipe(first()).toPromise();
    this.service.buildCurrentMenu(
      NavigationItemIds.DASHBOARD,

    );
    console.info(`ended await this.generateNewSpecialistMenu() => `, this.service.currentMenu);
  }

  async generateSpecialistMenu() {
    const agreggated = await this.aggregatorMemberTenantUser$.pipe(first()).toPromise();
    this.service.buildCurrentMenu(
      NavigationItemIds.HOME,
      NavigationItemIds.DIVIDER,
      NavigationItemIds.QUOTE_DASHBOARD,
      NavigationItemIds.DIVIDER,
      // NavigationItemIds.QUOTE_DOCUMENT,
      // NavigationItemIds.QUOTE_MEDICAID,
      // NavigationItemIds.QUOTE_SNAP,
      // NavigationItemIds.QUOTE_LIS,
      // NavigationItemIds.QUOTE_VETERAN,
      // NavigationItemIds.DIVIDER,
      NavigationItemIds.SPECIALIST_DOCUMENTS,
      NavigationItemIds.SPECIALIST_NOTES,
      // NavigationItemIds.DIVIDER,
      // NavigationItemIds.QUOTE_CUSTOM_INTERVIEW,
      // NavigationItemIds.DIVIDER,
      NavigationItemIds.ADMIN
    );
    console.info(`ended await this.generateSpecialistMenu() => `, this.service.currentMenu);
  }





  async generateAdminMenu() {
    const agreggated = await this.aggregatorMemberTenantUser$.pipe(first()).toPromise();
    this.service.buildCurrentMenu(
      NavigationItemIds.HOME,
      NavigationItemIds.ADMIN_DASHBOARD,
      NavigationItemIds.DIVIDER,

      NavigationItemIds.ADMIN_USERS,
      NavigationItemIds.ADMIN_ROLES,
      NavigationItemIds.DIVIDER,
      NavigationItemIds.PRODUCT_CATEGORIES,
      NavigationItemIds.PRODUCTS,
    );
    console.info(`ended await this.generateAdminMenu() => `, this.service.currentMenu);
  }

  async generateSettingsMenu() {
    const agreggated = await this.aggregatorMemberTenantUser$.pipe(first()).toPromise();
    this.service.buildCurrentMenu(
      NavigationItemIds.HOME,
      NavigationItemIds.SETTINGS_DASHBOARD,
      NavigationItemIds.DIVIDER,

      NavigationItemIds.SETTINGS_BANKING,
    );
    console.info(`ended await this.generateSettingsMenu() => `, this.service.currentMenu);
  }



  getMenuName(routeSnapshot: ActivatedRouteSnapshot) {
    let result = routeSnapshot && routeSnapshot.data && routeSnapshot.data.menu;
    if (result === undefined && routeSnapshot.parent) {
      result = this.getMenuName(routeSnapshot.parent);
    }

    return result;
  }

  firstChild(routeSnapshot: ActivatedRouteSnapshot) {
    const result = (routeSnapshot && this.firstChild(routeSnapshot.firstChild)) || routeSnapshot;
    return result;
  }
}

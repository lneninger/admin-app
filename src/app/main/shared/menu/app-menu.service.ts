import { NavigationItemIds } from 'src/app/main/main.navigation';
import { AggregatorsState } from 'src/app/main/services/+state-aggregators/aggregators.state';
import { ActivatedRoute, ActivatedRouteSnapshot, Router, Event, NavigationEnd } from '@angular/router';
import { Injectable } from '@angular/core';
import { MenuService } from 'src/app/shared/layout/layout-main/navigation/menu/menu.service';
import { Observable, Subscription } from 'rxjs';
import { Select } from '@ngxs/store';
import { filter, first } from 'rxjs/operators';
import { AppInitializerService } from 'src/app/shared/app-initializer/app-initializer.service';
import { ISecuredModule } from 'functions/src/site/site.models';
import { NavigationService } from 'src/app/shared/layout/layout-main/navigation/navigation.service';
import { NavigationItem } from 'src/app/shared/layout/layout-main/navigation/navigation.models';

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
    private router: Router,
    private navigationService: NavigationService
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
    await this.aggregatorMemberTenantUser$.pipe(first()).toPromise();
    await this.service.buildCurrentMenu(
      NavigationItemIds.DASHBOARD,
      NavigationItemIds.DIVIDER,
      NavigationItemIds.QUOTES,
      NavigationItemIds.SPECIALISTS,
      NavigationItemIds.PRODUCT_CATEGORIES,
      NavigationItemIds.PRODUCTS,
      ...(AppInitializerService.configuration && AppInitializerService.configuration.modules && AppInitializerService.configuration.modules.length) ? [
        NavigationItemIds.DIVIDER,
        ...this.generateSecuredModuleMenuItems(AppInitializerService.configuration.modules),
        NavigationItemIds.DIVIDER,
      ] : [],
      // NavigationItemIds.DIVIDER,
      // NavigationItemIds.QUOTE_CUSTOM_INTERVIEW,
      // NavigationItemIds.DIVIDER,
      // NavigationItemIds.QUOTE_NOTES,
      NavigationItemIds.ADMIN,
      NavigationItemIds.SETTINGS,
    );
    console.info(`ended await this.generateGlobalMenu() => `, this.service.currentMenu);

  }

  private generateSecuredModuleMenuItems(modules: ISecuredModule[]): string[] {
    const navigationItems = modules.map(moduleItem => ({
      id: moduleItem.name,
      label: moduleItem.displayName,
      routerLink: [`/app/secured/${moduleItem.path}`],
      bottom: false,
      icon: moduleItem.icon,
    } as NavigationItem))
    this.navigationService.addItem(...navigationItems);

    return navigationItems.map(item => item.id);
  }

  async generateNewQuoteMenu() {
    const agreggated = await this.aggregatorMemberTenantUser$.pipe(first()).toPromise();
    this.service.buildCurrentMenu(
      NavigationItemIds.DASHBOARD,

    );
    console.info(`ended await this.generateNewQuoteMenu() => `, this.service.currentMenu);
  }

  async generateQuoteMenu() {
    await this.aggregatorMemberTenantUser$.pipe(first()).toPromise();
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
    await this.aggregatorMemberTenantUser$.pipe(first()).toPromise();
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
    await this.aggregatorMemberTenantUser$.pipe(first()).toPromise();
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
    await this.aggregatorMemberTenantUser$.pipe(first()).toPromise();
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

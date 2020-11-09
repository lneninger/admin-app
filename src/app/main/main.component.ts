import { Actions, ofActionCompleted, Store } from '@ngxs/store';
import { Component, OnInit } from '@angular/core';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';
import { BaseComponent } from '../shared/base.component';
import { TenantService } from './services/tenant/tenant.service';
import { UserService } from './services/user/user.service';
import { TenantGetAction } from './services/tenant/states/tenant.state';
import { SetUserTokenAction } from './services/user/states/user.state';
import { first } from 'rxjs/operators';
import { NavigationItemIds, navigationItems } from './main.navigation';
import { BreadcrumbService } from '../shared/layout/layout-main/navigation/breadcrumb/breadcrumb.service';
import { NavigationService } from '../shared/layout/layout-main/navigation/navigation.service';

@AutoUnsubscribe()
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent extends BaseComponent implements OnInit {

  constructor(
    private store: Store,
    private userService: UserService,
    private actions$: Actions,
    navigationService: NavigationService,
    breadcrumbService: BreadcrumbService
  ) {
    super();

    navigationService.addItem(...navigationItems);


    breadcrumbService.build(NavigationItemIds.HOME);
  }


  async ngOnInit() {
    if (!this.userService.isAuthenticated) {
      await this.actions$.pipe(ofActionCompleted(SetUserTokenAction), first()).toPromise();
    }
    await this.store.dispatch(new TenantGetAction()).toPromise();
  }

}

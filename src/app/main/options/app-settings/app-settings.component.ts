import { SetUserCurrentRoleAction, UserState } from './../../services/user/states/user.state';
import { identifierModuleUrl } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Tenant } from 'src/app/main/services/tenant/states/tenant.models';
import { TenantState } from 'src/app/main/services/tenant/states/tenant.state';
import { Role } from '../../services/user/states/user.models';
import { AppStateModel } from 'src/app/app.state';



const globalRoles = [
  {
    id: 1,
    name: 'Screener'
  },
  {
    id: 2,
    name: 'Advocate'
  },
  {
    id: 3,
    name: 'Quality Assurance'
  },
  {
    id: 4,
    name: 'Admin'
  }
];

@Component({
  selector: 'app-app-settings',
  templateUrl: './app-settings.component.html',
  styleUrls: ['./app-settings.component.scss']
})
export class AppSettingsComponent implements OnInit {

  @Select(TenantState.tenants)
  globalTenants$: Observable<Tenant[]>;

  @Select(UserState.userRoles)
  userRoles$: Observable<Role[]>;

  get userCurrentRole() {
    return this.store.selectSnapshot<Role>((storeInst: AppStateModel) => {
      // debugger;
      return storeInst.UserState && storeInst.UserState.currentRole;
    });
  }

  set userCurrentRole(value: Role) {
    this.store.dispatch(new SetUserCurrentRoleAction(value));
  }

  selectedTenants = [];


  globalRoles = globalRoles;
  // userRole: any;

  legacy: string;

  constructor(
    private store: Store
  ) { }

  ngOnInit() {
    // debugger;
  }

}

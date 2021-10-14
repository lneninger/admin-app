
import { SetUserCurrentRoleAction, UserState } from './../../services/user/states/user.state';
import { identifierModuleUrl } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Tenant } from 'src/app/main/services/tenant/tenant.models';
import { Role } from '../../services/user/auth.models';
import { AppStateModel } from 'src/app/app.state';
import { TenantService } from '../../services/tenant/tenant.service';



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

  @Select(TenantService.globalTenants)
  globalTenants$: Observable<Tenant[]>;

  @Select(UserState.userRoles)
  userRoles$: Observable<Role[]>;

  get defaultTenants() {
    return this.store.selectSnapshot<Tenant[]>(TenantService.defaultTenants);
  }

  set defaultTenants(value: Tenant[]) {
    this.tenantService.setDefaultTenants(value);
  }

  get userCurrentRole() {
    return this.store.selectSnapshot<Role>(UserState.currentRole);
  }

  set userCurrentRole(value: Role) {
    this.store.dispatch(new SetUserCurrentRoleAction(value));
  }

  selectedTenants = [];


  globalRoles = globalRoles;
  // userRole: any;

  legacy: string;

  constructor(
    private store: Store,
    private tenantService: TenantService
  ) { }

  ngOnInit() {
    // debugger;
  }

}

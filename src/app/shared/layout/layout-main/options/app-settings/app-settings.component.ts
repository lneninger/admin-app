import { identifierModuleUrl } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Tenant } from 'src/app/main/states/tenant/tenant.models';
import { TenantState } from 'src/app/main/states/tenant/tenant.state';



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

  selectedTenants = [];


  globalRoles = globalRoles;
  userRole: any;

  legacy: string;

  constructor() { }

  ngOnInit() {
    // debugger;
  }

}

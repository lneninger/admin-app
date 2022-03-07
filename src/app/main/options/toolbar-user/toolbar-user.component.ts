import { animate, state, style, transition, trigger } from '@angular/animations';
import { AfterViewInit, Component, HostListener, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Select, Store } from '@ngxs/store';
import { User as FirebaseUser } from 'firebase/auth';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';
import { Observable, Subscription } from 'rxjs';
import { Tenant } from 'src/app/main/services/tenant/tenant.models';
import { Role } from 'src/app/main/services/user/auth.models';
import { AuthService } from 'src/app/main/services/user/auth.service';
import { UserService } from 'src/app/main/services/user/user.service';
import { BaseComponent } from 'src/app/shared/base.component';
import { AppOptionsService } from 'src/app/shared/layout/layout-main/options/app-options.service';

import { TenantService } from './../../services/tenant/tenant.service';

@AutoUnsubscribe()
@Component({
  selector: 'app-toolbar-user',
  templateUrl: './toolbar-user.component.html',
  styleUrls: ['./toolbar-user.component.scss'],
  animations: [
    trigger('searchToggle', [

      state('open', style({
        width: '100%',
        padding: '1rem'
      })),
      state('close', style({
        width: '0px',
      })),
      state('open-userdetails', style({
        display: 'block'
      })),
      state('close-userdetails', style({
        height: '0px',
        display: 'none'
      })),
      transition('void => close', [animate('0s')]),
      transition('* => close', [animate('0.2s')]),
      transition('* => open', [animate('0.5s')]),

    ])
  ]
})
export class ToolbarUserComponent extends BaseComponent implements OnInit, AfterViewInit {


  showUserDetailsDialog: boolean;

  clickInside: boolean;

  user$: Observable<FirebaseUser>;

  @Select(UserService.userRoles)
  userRoles$: Observable<Role[]>;



  @Select(TenantService.globalTenants)
  globalTenants$: Observable<Tenant[]>;

  defaultTenants: Tenant[] = [];
  defaultTenantsSubnscriptions: Subscription;

  constructor(
    public store: Store,
    public dialog: MatDialog,
    public optionsService: AppOptionsService,
    private authService: AuthService
  ) {
    super();
    this.defaultTenantsSubnscriptions = this.store.select<Tenant[]>(TenantService.defaultTenants).subscribe(defaultTenants => {
      this.defaultTenants = defaultTenants;
    });
  }

  ngOnInit(): void {
    this.user$ = this.authService.user$;
  }

  ngAfterViewInit() {
    this.initializeSearchListener();
  }


  @HostListener('click')
  click() {
    this.clickInside = true;
  }

  @HostListener('document:click', ['$event'])
  clickout(event) {
    // debugger;
    if (!this.clickInside) {
      // debugger;
      this.showUserDetailsDialog = false;
    }

    this.clickInside = false;
  }




  initializeSearchListener() {


  }

  showOverlay() {
    this.showUserDetailsDialog = true;
    // console.log(`show User details`);
  }

  hideOverlay() {
    this.showUserDetailsDialog = false;
    // console.log(`hide User details`);

  }

  someDefaultTenants(tenantName: string) {
    if (this.defaultTenants) {
      return this.defaultTenants.some(item => item.tenantName === tenantName);
    }
  }

}

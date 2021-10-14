import { TenantService } from '../../services/tenant/tenant.service';
import { BaseComponent } from 'src/app/shared/base.component';
import { Component, ElementRef, HostListener, Inject, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { animate, state, style, transition, trigger, useAnimation, AnimationEvent } from '@angular/animations';
import { bounce, bounceInLeft, fadeInLeft, fadeInRight, fadeOutLeft, fadeOutRight } from 'ng-animate';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { combineLatest, fromEvent, merge, Observable, of, Subscription } from 'rxjs';
import { debounceTime, filter, startWith, switchMap } from 'rxjs/operators';
import { NONE_TYPE } from '@angular/compiler';
import { CurrentRoleState, UserState } from 'src/app/main/services/user/states/user.state';
import { Role, UserModel } from 'src/app/main/services/user/auth.models';
import { Select, Store } from '@ngxs/store';
import { Tenant } from 'src/app/main/services/tenant/tenant.models';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';
import { AppOptionsService } from 'src/app/shared/layout/layout-main/options/app-options.service';

@AutoUnsubscribe()
@Component({
  selector: 'app-toolbar-add',
  templateUrl: './toolbar-add.component.html',
  styleUrls: ['./toolbar-add.component.scss'],
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
export class ToolbarAddComponent extends BaseComponent implements OnInit, AfterViewInit {


  showUserDetailsDialog: boolean;

  clickInside: boolean;

  @Select(UserState.user)
  user$: Observable<UserModel>;

  @Select(UserState.userRoles)
  userRoles$: Observable<Role[]>;

  @Select(UserState.currentRole)
  currentRole$: Observable<Role>;


  @Select(TenantService.globalTenants)
  globalTenants$: Observable<Tenant[]>;

  defaultTenants: Tenant[] = [];
  defaultTenantsSubnscriptions: Subscription;

  constructor(
    public store: Store,
    public dialog: MatDialog,
    public optionsService: AppOptionsService
  ) {
    super();
    this.defaultTenantsSubnscriptions = this.store.select<Tenant[]>(TenantService.defaultTenants).subscribe(defaultTenants => {
      this.defaultTenants = defaultTenants;
    });
  }

  ngOnInit(): void {
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

  toggleOverlay() {
    this.showUserDetailsDialog = !this.showUserDetailsDialog;
  }

}

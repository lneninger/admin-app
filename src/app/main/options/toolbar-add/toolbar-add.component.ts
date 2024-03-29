import { animate, state, style, transition, trigger } from '@angular/animations';
import { AfterViewInit, Component, HostListener, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Select, Store } from '@ngxs/store';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';
import { Observable } from 'rxjs';
import { Role } from 'src/app/main/services/user/auth.models';
import { UserService } from 'src/app/main/services/user/user.service';
import { BaseComponent } from 'src/app/shared/base.component';
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

  @Select(UserService.userRoles)
  userRoles$: Observable<Role[]>;


  constructor(
    public store: Store,
    public dialog: MatDialog,
    public optionsService: AppOptionsService
  ) {
    super();
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

import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { UserService } from 'src/app/main/services/user/user.service';
import { FirebaseService } from 'src/app/shared/firebase/firebase.service';

import { Role } from '../../services/user/auth.models';



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


  @Select(UserService.userRoles)
  userRoles$: Observable<Role[]>;


  get userCurrentRole() {
    return this.store.selectSnapshot<string>(UserService.currentRole);
  }

  set userCurrentRole(value: string) {
    this.userService.setCurentRole(value);
  }

  selectedTenants = [];


  globalRoles = globalRoles;
  // userRole: any;

  legacy: string;

  constructor(
    private store: Store,
    private userService: UserService,
    private firebaseService: FirebaseService
  ) { }

  ngOnInit() {
    // debugger;
  }

}

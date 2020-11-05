import { TenantGetAction } from './main/services/tenant/states/tenant.state';
import { Store } from '@ngxs/store';
import { Component } from '@angular/core';
import { UserService } from './main/services/user/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(
    private userService: UserService) {

    // store.dispatch(new TenantGetAction());

  }
}

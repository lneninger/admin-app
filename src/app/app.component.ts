import { TenantGetAction } from './main/services/tenant/states/tenant.state';
import { Store } from '@ngxs/store';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(private store: Store) {

    store.dispatch(new TenantGetAction());

  }
}

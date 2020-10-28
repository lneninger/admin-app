import { TenantGetAction } from './main/states/tenant/tenant.state';
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

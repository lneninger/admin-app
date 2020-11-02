import { Injectable } from '@angular/core';
import { Store } from '@ngxs/store';
import { OptionsExpandedToggleAction } from '../../states/appconfig.state';


@Injectable({
  providedIn: 'root'
})
export class AppOptionsService {

  constructor(private store: Store) { }

  toggleOptions(current?: string) {
    this.store.dispatch(new OptionsExpandedToggleAction(current));
  }
}

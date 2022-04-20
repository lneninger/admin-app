import { UserService } from 'src/app/main/services/user/user.service';
import { Selector, State, Store } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { AuthStateModel } from '../user/auth.models';
import { UserStateModel } from '../user/user.models';


@State<any>({
  name: 'aggregators',
  defaults: null
})
@Injectable()
export class AggregatorsState {

  constructor(private store: Store) {
  }
}

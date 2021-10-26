import { UserService } from 'src/app/main/services/user/user.service';
import { NgxsDataRepository } from '@ngxs-labs/data/repositories';
import { FirebaseService } from './../../../shared/firebase/firebase.service';
import { Injectable } from '@angular/core';
import { Persistence, StateRepository } from '@ngxs-labs/data/decorators';
import { State, Store } from '@ngxs/store';
import { IPaymentStateModel } from './paymernt.state.models';


@Persistence({
  existingEngine: sessionStorage
})
@StateRepository()
@State<IPaymentStateModel>({
  name: 'paymentState',
  defaults: {

  }

})
@Injectable()
export class PaymentService extends NgxsDataRepository<IPaymentStateModel>{

  static currentPaymentMethodSelector(state: IPaymentStateModel) {
    return state.currentPaymentMethod;
  }

  get currentPaymentMethod() {
    return this.snapshot.currentPaymentMethod;
  }

  constructor(
    private firebase: FirebaseService,
    private userService: UserService
    ) {
    super();
  }

  async load(){
    return this.firebase.firestore.collection('users').get().toPromise();
  }
}

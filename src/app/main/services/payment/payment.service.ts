import { UserService } from 'src/app/main/services/user/user.service';
import { FirebaseService } from './../../../shared/firebase/firebase.service';
import { Injectable } from '@angular/core';
import { State, Store } from '@ngxs/store';
import { IPaymentStateModel } from './paymernt.state.models';
import { Persistence, StateRepository } from '@angular-ru/ngxs/decorators';
import { NgxsDataRepository } from '@angular-ru/ngxs/repositories';


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
    this.firebase.firestore.collection('users').add({name: 'Test'});
    return this.firebase.firestore.collection('users').get().toPromise();
  }
}

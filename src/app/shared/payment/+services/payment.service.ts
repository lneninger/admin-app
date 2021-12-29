import { environment } from 'src/environments/environment';
import { UserService } from 'src/app/main/services/user/user.service';
import { FirebaseService } from '../../firebase/firebase.service';
import { Injectable } from '@angular/core';
import { State, Store } from '@ngxs/store';
import { IPaymentStateModel } from './paymernt.state.models';
import { Persistence, StateRepository } from '@angular-ru/ngxs/decorators';
import { NgxsDataRepository } from '@angular-ru/ngxs/repositories';
import { ICustomerInputModel } from '../+models/customer-create';
import { AuthService } from 'src/app/main/services/user/auth.service';
import { IPlaidTokenInputModel } from '../+models/plaid';


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
    private authService: AuthService,
  ) {
    super();
  }

  async setCurrentUserAsCustomer() {
    const req = {
      entityId: this.authService.credentials.user.uid,
      email: this.authService.credentials.user.email,
      name: this.authService.credentials.user.displayName,
    } as ICustomerInputModel;

    const customerCreateFn = this.firebase.fns.httpsCallable('customerCreate');
    return customerCreateFn(req).toPromise();
  }


  async createPlaidToken() {
    const req = {
      appName: environment.appTitle,
      stripeCustomerId: string;
    } as IPlaidTokenInputModel;

    const customerCreateFn = this.firebase.fns.httpsCallable('customerCreate');
    return customerCreateFn(req).toPromise();
  }
}

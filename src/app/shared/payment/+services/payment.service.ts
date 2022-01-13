import { Persistence, StateRepository } from '@angular-ru/ngxs/decorators';
import { NgxsDataRepository } from '@angular-ru/ngxs/repositories';
import { Injectable } from '@angular/core';
import { State, Store } from '@ngxs/store';
import { AppStateModel } from 'src/app/app.state';
import { AuthService } from 'src/app/main/services/user/auth.service';
import { environment } from 'src/environments/environment';

import { ICustomerInputModel } from '../+models/customer-create';
import {
  IPlaidLinkTokenRequestModel,
  IPlaidLinkTokenResponseModel,
  IPlaidStripeRequestModel as ICreateBankAccountRequestModel,
  IPlaidStripeResponseModel as ICreateBankAccountResponseModel,
} from '../+models/plaid';
import { FirebaseService } from '../../firebase/firebase.service';
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
    private authService: AuthService,
    private store: Store,
    private firebaseService: FirebaseService
  ) {
    super();
  }

  async ngxsAfterBootstrap() {
    super.ngxsAfterBootstrap();


    this.firebaseService.auth.authState.subscribe(async user => {
      if (user) {
        // create customer in stripe. payment api
        await this.setCurrentUserAsCustomer();
      }
    });
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


  async createPlaidToken(): Promise<IPlaidLinkTokenResponseModel> {
    const req = {
      appName: environment.appTitle,
      stripeCustomerId: this.store.selectSnapshot<string>((store: AppStateModel) => store.userState.paymentMetadata.paymentId),
    } as IPlaidLinkTokenRequestModel;

    const customerCreateFn = this.firebase.fns.httpsCallable<IPlaidLinkTokenRequestModel, IPlaidLinkTokenResponseModel>('plaidToken');
    return customerCreateFn(req).toPromise();
  }

  async createBankAccount(req: ICreateBankAccountRequestModel): Promise<ICreateBankAccountResponseModel>{
    const createBankAccountFn = this.firebase.fns.httpsCallable<ICreateBankAccountRequestModel, ICreateBankAccountResponseModel>('attackBankAccount');
    return createBankAccountFn(req).toPromise();
  }

}

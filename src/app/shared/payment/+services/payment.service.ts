import { Persistence, StateRepository } from '@angular-ru/ngxs/decorators';
import { NgxsDataRepository } from '@angular-ru/ngxs/repositories';
import { Injectable } from '@angular/core';
import { State, Store } from '@ngxs/store';
import { AppStateModel } from 'src/app/app.state';
import { AuthService } from 'src/app/main/services/user/auth.service';
import { environment } from 'src/environments/environment';

import { ICustomerInputModel } from '../+models/customer-create';
import {
  ICreateSourceResponseModel,
  IPlaidLinkTokenRequestModel,
  IPlaidLinkTokenResponseModel,
  IPlaidStripeRequestModel as ICreateBankAccountRequestModel,
  IPlaidStripeResponseModel as ICreateBankAccountResponseModel,
} from '../+models/plaid';
import { ICreateSourceRequestModel } from '../+models/source-create';
import { FirebaseService } from '../../firebase/firebase.service';
import { IPaymentMethodRequestModel, IPaymentMethodResponseModel, IPaymentStateModel } from './payment.state.models';


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


    this.firebaseService.authNew.authState.subscribe(async user => {
      if (user) {
        // create customer in stripe. payment api
        await this.setCurrentUserAsCustomer();
      }
    });
  }



  async setCurrentUserAsCustomer() {
    const req = {
      userId: this.authService.credentials.user.uid,
      email: this.authService.credentials.user.email,
      fullName: this.authService.credentials.user.displayName || this.authService.credentials.user.email,
    } as ICustomerInputModel;

    const customerCreateFn = this.firebase.fnsNew.httpsCallable('customerCreate');
    return customerCreateFn(req).toPromise();
  }


  async createPlaidToken(): Promise<IPlaidLinkTokenResponseModel> {
    const req = {
      appName: environment.appTitle,
      stripeCustomerId: this.store.selectSnapshot<string>((store: AppStateModel) => store.userState.paymentMetadata.paymentId),
    } as IPlaidLinkTokenRequestModel;

    const customerCreateFn = this.firebase.fnsNew.httpsCallable<IPlaidLinkTokenRequestModel, IPlaidLinkTokenResponseModel>('plaidToken');
    return customerCreateFn(req).toPromise();
  }

  async createPaymentMethod(req: IPaymentMethodRequestModel): Promise<IPaymentMethodResponseModel>{
    const paymentMethodCreateFn = this.firebase.fnsNew.httpsCallable<IPaymentMethodRequestModel, IPaymentMethodResponseModel>('paymentMethodCreate');
    return paymentMethodCreateFn(req).toPromise();
  }

  async createBankAccountToken(req: ICreateBankAccountRequestModel): Promise<ICreateBankAccountResponseModel>{
    const createBankAccountFn = this.firebase.fnsNew.httpsCallable<ICreateBankAccountRequestModel, ICreateBankAccountResponseModel>('attachBankAccount');
    return createBankAccountFn(req).toPromise();
  }

  async createSource(req: ICreateSourceRequestModel): Promise<ICreateSourceResponseModel>{
    const createSourceFn = this.firebase.fnsNew.httpsCallable<ICreateSourceRequestModel, ICreateSourceResponseModel>('createSource');
    return createSourceFn(req).toPromise();
  }

}

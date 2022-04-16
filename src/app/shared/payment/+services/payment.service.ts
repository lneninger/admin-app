import { filter, firstValueFrom } from 'rxjs';
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
import { ICreateSourceRequestModel, IGetPaymentMethodsRequestModel, IGetPaymentMethodsResponseItemModel, IGetPaymentMethodsResponseModel, IPaymentMethodAttachRequestModel, IPaymentMethodAttachResponseModel } from '../+models/source-create';
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


    this.firebaseService.auth.authState.subscribe(async user => {
      if (user) {
        // create customer in stripe. payment api
        await this.setCurrentUserAsCustomer();
      }
    });
  }



  async setCurrentUserAsCustomer() {
    await firstValueFrom(this.authService.credentials$.pipe(filter(_ => !!_)));
    const req = {
      userId: this.authService.credentials.user.uid,
      email: this.authService.credentials.user.email,
      fullName: this.authService.credentials.user.displayName || this.authService.credentials.user.email,
    } as ICustomerInputModel;

    const customerCreateFn = this.firebase.fns.httpsCallable('customerCreate');
    return customerCreateFn(req).toPromise();
  }


  async createPlaidToken(): Promise<IPlaidLinkTokenResponseModel> {
    const req = {
      appName: environment.appTitle,
      stripeCustomerId: this.store.selectSnapshot<string>((store: AppStateModel) => store.userState.paymentMetadata.paymentId),
    } as IPlaidLinkTokenRequestModel;

    const fn = this.firebase.fns.httpsCallable<IPlaidLinkTokenRequestModel, IPlaidLinkTokenResponseModel>('plaidToken');
    return firstValueFrom(fn(req));
  }

  async attachBankAccount(req: IPaymentMethodRequestModel): Promise<IPaymentMethodResponseModel>{
    const fn = this.firebase.fns.httpsCallable<IPaymentMethodRequestModel, IPaymentMethodResponseModel>('attachBankAccount');
    return firstValueFrom(fn(req));
  }

  async createBankAccountToken(req: ICreateBankAccountRequestModel): Promise<ICreateBankAccountResponseModel>{
    const fn = this.firebase.fns.httpsCallable<ICreateBankAccountRequestModel, ICreateBankAccountResponseModel>('attachBankAccount');
    return firstValueFrom(fn(req));
  }

  async createSource(req: ICreateSourceRequestModel): Promise<ICreateSourceResponseModel>{
    const fn = this.firebase.fns.httpsCallable<ICreateSourceRequestModel, ICreateSourceResponseModel>('sourceCreate');
    return firstValueFrom(fn(req));
  }

  async paymentMethods(req: IGetPaymentMethodsRequestModel): Promise<IGetPaymentMethodsResponseItemModel[]>{
    const fn = this.firebase.fns.httpsCallable<IGetPaymentMethodsRequestModel, IGetPaymentMethodsResponseItemModel[]>('paymentMethodList');
    return firstValueFrom(fn(req));
  }

  async paymentMethodAttach(req: IPaymentMethodAttachRequestModel) {
    const fn = this.firebase.fns.httpsCallable<IPaymentMethodAttachRequestModel, IPaymentMethodAttachResponseModel[]>('paymentMethodAttach');
    return firstValueFrom(fn(req));
  }


}

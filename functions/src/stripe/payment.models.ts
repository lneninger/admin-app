export interface IPaymentInputModel {
  amount: number;
  currency: string;
  localType: string; // type to identify the transaction type
}

export interface ICustomerInputModel{
  userId: string;
  email: string;
  fullName: string;
}

export interface ICustomerAddPaymentMethodInputModel {
  userId: string;

}


export interface IUserPaymentConfig{
  customerId?: string;
}


export interface IPlaidTokenInputModel{
  appName: string;
  stripeCustomerId: string;
}

export interface IPlaidStripeInputModel{
  accountId: string;
  publicToken: string;
  userId?: string;

}


export interface IProduct{
  name: string;
  active: boolean;
  description: string;
  metadata: string;
  shippable?: boolean;
  subscribable?: boolean;
  price?: number;
}

export interface IProductInputModel{
  id?: string;
  name: string;
  active: string;
  description: string;
  metadata: string;
}


export interface IPaymentMethodListInputModel{
  userId: string;
}




// -- Attach payment method

export interface IPaymentMethodRequestModel {
  data: IPaymentMethodPlaidTokenModel | IPaymentMethodBankAccountFormModel,
  type: 'BankAccountPlaidToken' | 'BankAccountManual';
  uid: string;
}

// export interface IPaymentMethodResponseModel {

// }


export interface IPaymentMethodPlaidTokenModel {
  accountId: string,
  publicToken: string,
}

export interface IPaymentMethodBankAccountFormModel {
  institution: string;
  holderName: string;
  routingNumber: string;
  acountNumber: string;

}


/************************************************************************** */
//Source
export interface ICreateSourceRequestModel {
  uid: string;
  type: 'card' | 'bank_account';
  source: IStripeSource;
}

export type IStripeSource = ICardPaymentSource;

export interface ICardPaymentSource {
  token: string;
}



/************************************************************************** */
//Payment method
export interface IPaymentMethodAttachRequestModel {
  uid: string;
  paymentMethodId: string;
}

export interface IPaymentMethodAttachResponseModel {
  error: any;
}




export interface ICreateSourceRequestModel {
  uid: string;
  type: 'card' | 'bank_account';
  source: IStripeSource;
}

export type IStripeSource = IPaymentSource;

export interface IPaymentSource {

}



export interface IGetPaymentMethodsRequestModel{

}

export interface IGetPaymentMethodsResponseModel{
  data: IGetPaymentMethodsResponseItemModel[];
  has_more: boolean;
  object: 'list' | string;
}

export interface IGetPaymentMethodsResponseItemModel{
  account_holder_name: string;
  account_holder_type: string;
  account_type: string;
  bank_name: string;
  country: string;
  currency: string;
  customer: string;
  fingerprint: string;
  id: string;
  last4: string;
  metadata: any
  object: string;
  routing_number: string;
  status: string;
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

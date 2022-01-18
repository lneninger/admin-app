
export interface IPaymentStateModel {
  currentPaymentMethod?: string;

}


export interface IPaymentMethodRequestModel {

}

export interface IPaymentMethodResponseModel {

}


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

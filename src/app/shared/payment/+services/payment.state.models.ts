
export interface IPaymentStateModel {
  currentPaymentMethod?: string;

}


export interface IPaymentMethodRequestModel {
  data: IPaymentMethodPlaidTokenModel | IPaymentMethodBankAccountFormModel,
  type: 'BankAccountPlaidToken' | 'BankAccountManual';
  uid: string;
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

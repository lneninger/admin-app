export interface IPaymentInputModel {
  amount: number;
  currency: string;
  localType: string; // type to identify the transaction type
}

export interface ICustomerInputModel{
  entityId: string;
  email: string;
  fullName: string;
}

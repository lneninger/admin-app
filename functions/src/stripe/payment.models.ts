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

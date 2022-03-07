
export interface ICreateSourceRequestModel {
  userId: string;
  source: IStripeSource;
}

export type IStripeSource = IPaymentSource;

export interface IPaymentSource {

}

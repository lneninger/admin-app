export interface ICheckoutSessionCreateInputModel {
  userId: string;
  successUrl: string;
  cancelUrl: string;
  lineItems: [
    { priceId: string, quantity: number }
  ],
}

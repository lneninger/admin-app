export interface ISubscriptionItem {
  id: number;
  description: string;

  productId: number;
  productName: string;

  customerId: number;
  customerName: string;

  createdDate: Date;
}

import { IFireStoreDocument } from 'src/app/shared/firebase/firestore.models';

export interface ISubscriptionItem {
  name: string;
  order: number;
  description: string;
  icon: string;
  price: number;
  activateDate: Date;
  details: IFireStoreDocument<ISubscriptionItemDetail>[];
  markedForDelete: boolean;
  st_priceid: string;
}

export interface ISubscriptionItemDetail {
  description: string;
}


export interface IAttachSubscriptionToCustomerRequest{
  subscriptionId: string;
  uid?: string;
}

export interface IAttachSubscriptionToCustomerResponse{

}

export interface ICheckoutSessionCreateRequest {
  userId: string;
  successUrl: string;
  cancelUrl: string;
  lineItems: [
    { priceId: string, quantity: number }
  ],
}

export interface ICheckoutSessionCreateResponse {
  sessionId: string;
}


export interface IUserSubscriptionGetRequest{
  userId: string;
  tryFromSource: boolean;
}

export interface IUserSubscriptionGetResponse{
  userId: string;
  subscriptionId: string;
  subscriptionName: string;
  st_subscriptionid: string;
}

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

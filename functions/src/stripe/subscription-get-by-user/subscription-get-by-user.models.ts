
export interface ISubscriptionGetByUserRequest{
  userId: string;
  tryFromSource: boolean;
}

export interface ISubscriptionGetByUserResponse{
  userId: string;
  subscriptionId: string;
  subscriptionName: string;
  st_subscriptionid: string;
}

export interface ISubscriptionItem {
  name: string;
  order: number;
  description: string;
  icon: string;
  price: number;
  activateDate: Date;
  details: any[], //IFireStoreDocument<ISubscriptionItemDetail>[];
  markedForDelete: boolean;
  st_priceid: string;
}

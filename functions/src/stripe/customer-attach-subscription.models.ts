export interface ICustomerAttachSubscriptionInputModel {
  subscriptionId: string;
  uid?: string;
}

export interface IAttachSubscriptionToCustomerResponse {
  detail: string;
}


export interface ISubscriptionItem {
  name: string;
  order: number;
  description: string;
  icon: string;
  price: number;
  activateDate: Date;
  details: [];
  markedForDelete: boolean;
  st_prodid: string;
  st_priceid: string;
}


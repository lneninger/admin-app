import { FirestoreDocumentMapping } from '../../functions.models';

export interface ISubscriptionItem {
  name: string;
  order: number;
  description: string;
  icon: string;
  price: number;
  activateDate: Date;
  details: FirestoreDocumentMapping<ISubscriptionItemDetail>[];
  markedForDelete: boolean;
  st_prodid: string;
  st_priceid: string;
}

export interface ISubscriptionItemDetail {
  description: string;
}

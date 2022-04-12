import { IFireStoreDocument } from 'src/app/shared/firebase/firestore.models';

export interface ISubscriptionItem {
  name: string;
  price: number;
  activateDate: Date;
  details: IFireStoreDocument<ISubscriptionItemDetail>[]
}

export interface ISubscriptionItemDetail {
  description: string;
}

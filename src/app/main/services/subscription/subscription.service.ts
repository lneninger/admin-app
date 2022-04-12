import { Injectable } from '@angular/core';
import { Store } from '@ngxs/store';
import { firstValueFrom } from 'rxjs';
import { FirebaseService } from 'src/app/shared/firebase/firebase.service';
import { DataRetrieverInput, GridData } from 'src/app/shared/grid/grid-config';

import { IFireStoreDocument } from './../../../shared/firebase/firestore.models';
import { ISubscriptionItem, ISubscriptionItemDetail } from './subscription.models';


@Injectable({
  providedIn: 'root'
})
export class SubscriptionService {

  readonly targetCollection = 'app-subscriptions';

  constructor(
    private firebaseService: FirebaseService,
    private store: Store) {
  }

  async search(input: DataRetrieverInput): Promise<GridData<IFireStoreDocument<ISubscriptionItem>>> {

    const collection = this.firebaseService.firestore.collection<ISubscriptionItem>(this.targetCollection, query => {
      let queryResult = query.limit(input.pageSize);
      if (input.sort) {
        queryResult = queryResult.orderBy(input.sort.field, input.sort.direction);
      }
      if (input.lastRetrieved) {
        queryResult = queryResult.startAt((input.lastRetrieved as IFireStoreDocument<ISubscriptionItem>).$original);
      }

      return queryResult;
    });

    const items = (await firstValueFrom(collection.get())).docs.map(_ => ({ id: _.id, data: _.data(), $original: _ } as IFireStoreDocument<ISubscriptionItem>));

    return { items };
  }

  async addDetail(subscriptionId: string, detail: ISubscriptionItemDetail) {
    return this.firebaseService.firestore.collection(`${this.targetCollection}/${subscriptionId}/details`).add(detail);
  }

  async updateDetail(subscriptionId: string, detailId: string, detail: ISubscriptionItemDetail) {
    await this.firebaseService.firestore.doc(`${this.targetCollection}/${subscriptionId}/details/${detailId}`).set(detail);
  }

  async removeDetail(subscriptionId: string, detailId: string) {
    await this.firebaseService.firestore.doc(`${this.targetCollection}/${subscriptionId}/details/${detailId}`).delete();
  }


}

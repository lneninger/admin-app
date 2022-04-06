import { Injectable } from '@angular/core';
import { Store } from '@ngxs/store';
import { query } from 'firebase/firestore';
import { firstValueFrom } from 'rxjs';
import { FirebaseService } from 'src/app/shared/firebase/firebase.service';
import { DataRetrieverInput } from 'src/app/shared/grid/grid-config';

import { ISubscriptionItem } from './subscription.models';


@Injectable({
  providedIn: 'root'
})
export class SubscriptionService {

  constructor(
    private firebaseService: FirebaseService,
    private store: Store) {
  }

  async search(input: DataRetrieverInput) {

    const collection = this.firebaseService.firestore.collection<ISubscriptionItem>('app-subscriptions', query => {
      let queryResult = query.limit(input.pageSize);
      if (input.sort) {
        queryResult = queryResult.orderBy(input.sort.field, input.sort.direction);
      }
      if (input.lastRetrieved) {
        queryResult = queryResult.startAt(input.lastRetrieved);
      }

      return queryResult;
    });

    const items = (await firstValueFrom(collection.get())).docs;

    return { items };


    // const collection = this.firebaseService.firestore.collection<ISubscriptionItem>('app-subscriptions');
    // let ref = collection.ref;
    // // let queryObj = query<ISubscriptionItem>(ref);

    // if (input.sort) {
    //   query<ISubscriptionItem>(ref, orderBy(input.sort.field, input.sort.direction || 'asc'));
    // }

    // /*Where clause*/

    // let totalCount: number;
    // if (input.retrieveTotalAmount) {
    //   totalCount = (await ref.get()).size;
    // }

    // query<ISubscriptionItem>(ref, limit(input.pageSize));


    // // if (input.lastRetrieved) {
    // //   queryObj = query<ISubscriptionItem>(ref, startAt(input.lastRetrieved));
    // // }

    // const items = (await firstValueFrom(collection.get())).docs;

    // return { totalCount, items };
  }


}

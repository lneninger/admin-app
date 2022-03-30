import { Injectable } from '@angular/core';
import { Store } from '@ngxs/store';
import { limit, orderBy, query, startAfter } from 'firebase/firestore';
import { firstValueFrom } from 'rxjs';
import { FirebaseService } from 'src/app/shared/firebase/firebase.service';
import { DataRetrieverInput } from 'src/app/shared/grid/grid-config';

import { ISubscriptionItem } from './subscription.models';


@Injectable()
export class SubscriptionService{

  constructor(
    private firebaseService: FirebaseService,
    private store: Store) {
  }

  async search(input: DataRetrieverInput) {
    const collection= this.firebaseService.firestore.collection<ISubscriptionItem>('app-subscription-items');
    let ref = collection.ref;
    let queryObj = query<ISubscriptionItem>(ref);
    if (input.sort) {
      queryObj = query<ISubscriptionItem>(ref, orderBy(input.sort.field));
    }

    /*Where clause*/

    let total: number;
    if (input.retrieveTotalAmount) {
      total = (await ref.get()).size;
    }

    queryObj = query(queryObj, limit(input.pageSize));
    queryObj = input.lastRetrieved ? query(queryObj, startAfter(input.lastRetrieved)) : queryObj;
    const items = await firstValueFrom(collection.get());

    return { total, items };
  }


}

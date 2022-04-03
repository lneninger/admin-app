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
      query.limit(input.pageSize);
      if (input.sort) {
        query.orderBy(input.sort.field);
      } else {
        query.orderBy(input.defaultSortField);
      }
      if (input.lastRetrieved) {
        query.startAt(input.lastRetrieved);
      }

      return query;
    });

    const items = (await firstValueFrom(collection.get())).docs;

    return { /*total, */items };
  }


}

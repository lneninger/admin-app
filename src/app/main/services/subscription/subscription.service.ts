import { Injectable } from '@angular/core';
import { Store } from '@ngxs/store';
import { first, firstValueFrom, lastValueFrom } from 'rxjs';
import { FirebaseService } from 'src/app/shared/firebase/firebase.service';
import { DataRetrieverInput, GridData } from 'src/app/shared/grid/grid-config';

import { IFireStoreDocument } from './../../../shared/firebase/firestore.models';
import { IAttachSubscriptionToCustomerRequest, ICheckoutSessionCreateRequest, ICheckoutSessionCreateResponse, ISubscriptionItem, ISubscriptionItemDetail, IUserSubscriptionGetRequest, IUserSubscriptionGetResponse } from './subscription.models';


@Injectable({
  providedIn: 'root'
})
export class SubscriptionService {


  readonly targetCollection = 'app-subscriptions';

  constructor(
    private firebaseService: FirebaseService,
    private store: Store) {
  }

  async getFull() {
    const response = await lastValueFrom(this.firebaseService.firestore.collection(`app-subscriptions`, (queryRef) => {
      return queryRef.orderBy('order', 'asc');
    }).get());


    const subscriptions = response.docs.map(item => {
      return SubscriptionService.map(item);
    });

    for (const subscription of subscriptions) {
      const detailsResponse = await this.firebaseService.firestore.collection(`app-subscriptions/${subscription.id}/details`, (queryRef) => {
        return queryRef.orderBy('description', 'asc');
      }).ref.get();

      subscription.data.details = detailsResponse.docs.map(detail => SubscriptionService.mapDetail(detail));
    }

    return subscriptions;
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

    const items = (await firstValueFrom(collection.get())).docs.map(_ => SubscriptionService.map(_));

    return { items };
  }

  static map(doc: any) {
    return ({ id: doc.id, data: doc.data(), $original: doc } as IFireStoreDocument<ISubscriptionItem>);
  }

  static mapDetail(doc: any) {
    return ({ id: doc.id, data: doc.data(), $original: doc } as IFireStoreDocument<ISubscriptionItemDetail>);
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

  async attachSubscriptionToCustomer(req: IAttachSubscriptionToCustomerRequest) {
    const fn = this.firebaseService.fns.httpsCallable('attachSubscription');
    return firstValueFrom(fn(req));
  }

  async createCheckoutSession(req: ICheckoutSessionCreateRequest) {
    const fn = this.firebaseService.fns.httpsCallable('checkoutSessionCreate');
    return firstValueFrom(fn(req));
  }

  async getUserSubscription(req: IUserSubscriptionGetRequest) {
    const fn = this.firebaseService.fns.httpsCallable('getSubscription');
    return firstValueFrom<IUserSubscriptionGetResponse>(fn(req));
  }


}

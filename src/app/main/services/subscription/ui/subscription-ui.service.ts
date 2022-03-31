import { EventEmitter, Injectable } from '@angular/core';
import { SubscriptionUIEvent, SubscriptionUIEventType } from './subscription-ui.models';

@Injectable({
  providedIn: 'root'
})
export class SubscriptionUIService {
  broadcast$ = new EventEmitter<SubscriptionUIEvent>();

  constructor() { }

  closeAction(action: string) {
    this.broadcast$.next({type:SubscriptionUIEventType.closeAction});
  }

}

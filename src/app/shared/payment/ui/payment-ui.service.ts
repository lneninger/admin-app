import { EventEmitter, Injectable } from '@angular/core';
import { PaymentUIEvent, PaymentUIEventType } from './payment-ui.models';
import { PaymentUIModule } from './payment-ui.module';

@Injectable({
  providedIn: 'root'
})
export class PaymentUIService {
  broadcast$ = new EventEmitter<PaymentUIEvent>();

  constructor() { }

  closeAction(action: string) {
    this.broadcast$.next({type:PaymentUIEventType.closeAction});
  }

}

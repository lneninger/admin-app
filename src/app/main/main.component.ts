import { PaymentService } from 'src/app/main/services/payment/payment.service';
import { Component, OnInit } from '@angular/core';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';

import { BaseComponent } from '../shared/base.component';
import { BreadcrumbService } from '../shared/layout/layout-main/navigation/breadcrumb/breadcrumb.service';
import { NavigationItemIds } from './main.navigation';

@AutoUnsubscribe()
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent extends BaseComponent implements OnInit {
  currentPaymentMethod: string;

  constructor(
    breadcrumbService: BreadcrumbService,
    private paymentService: PaymentService
  ) {
    super();
    breadcrumbService.build(NavigationItemIds.HOME);
    this.currentPaymentMethod = this.paymentService.currentPaymentMethod;
  }


  async ngOnInit() {
    const loaded = await this.paymentService.load();
  }
}

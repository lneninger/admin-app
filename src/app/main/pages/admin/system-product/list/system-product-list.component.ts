import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Select } from '@ngxs/store';
import { UserCredential } from 'firebase/auth';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';
import { StripeService } from 'ngx-stripe';
import { NavigationItemIds } from 'src/app/main/main.navigation';
import { AuthService } from 'src/app/main/services/user/auth.service';
import { HybridDisplayModeComponent } from 'src/app/shared/hybrid.displaymode.component';
import { BreadcrumbService } from 'src/app/shared/layout/layout-main/navigation/breadcrumb/breadcrumb.service';
import { IGetPaymentMethodsResponseItemModel } from 'src/app/shared/payment/+models/source-create';
import { PaymentService } from 'src/app/shared/payment/+services/payment.service';

import { UserService } from './../../../../services/user/user.service';

@AutoUnsubscribe()
@Component({
  selector: 'app-payment-method-list',
  templateUrl: './system-product-list.component.html',
  styleUrls: ['./system-product-list.component.scss']
})
export class SystemProductListComponent extends HybridDisplayModeComponent implements OnInit {

  @Select(AuthService.credentials)
  userCredentials: UserCredential;

  paymentMethods: IGetPaymentMethodsResponseItemModel[];

  constructor(
    breadcrumbService: BreadcrumbService,
    private fmBuilder: FormBuilder,
    private service: PaymentService,
    private router: Router,
    private route: ActivatedRoute,
    private stripeService: StripeService,
    private userService: UserService,
  ) {
    super();

    breadcrumbService.build(NavigationItemIds.HOME, NavigationItemIds.SETTINGS, NavigationItemIds.SETTINGS_BANKING);
  }

  async ngOnInit() {
    this.paymentMethods = (await this.service.paymentMethods({
      userId: this.userService.user.uid
    }));

  }

  createForm() {

  }


}

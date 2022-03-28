import { Component, OnInit } from '@angular/core';
import { Select } from '@ngxs/store';
import { UserCredential } from 'firebase/auth';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';
import { filter, firstValueFrom } from 'rxjs';
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
  templateUrl: './payment-method-list.component.html',
  styleUrls: ['./payment-method-list.component.scss']
})
export class PaymentMethodListComponent extends HybridDisplayModeComponent implements OnInit {

  @Select(AuthService.credentials)
  userCredentials: UserCredential;

  paymentMethods: IGetPaymentMethodsResponseItemModel[];

  constructor(
    breadcrumbService: BreadcrumbService,
    private service: PaymentService,
    private userService: UserService,
  ) {
    super();

    breadcrumbService.build(NavigationItemIds.HOME, NavigationItemIds.SETTINGS, NavigationItemIds.SETTINGS_BANKING);
  }

  async ngOnInit() {
    await firstValueFrom(this.userService.user$.pipe(filter(_ => !!_)));
    this.paymentMethods = (await this.service.paymentMethods({
      userId: this.userService.user.uid
    }));

  }

  createForm() {

  }


}

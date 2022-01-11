import { LayoutMainCommonModule } from '../../../../shared/layout/layout-main/layout-main-common/layout-main-common.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SubscriptionsRoutingModule } from './subscriptions-routing.module';
import { AdminSubscriptionsComponent } from './subscriptions.component';


@NgModule({
  declarations: [AdminSubscriptionsComponent],
  imports: [
    CommonModule,
    SubscriptionsRoutingModule,
    LayoutMainCommonModule
  ]
})
export class AdminSubscriptionsModule { }

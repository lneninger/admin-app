import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Select } from '@ngxs/store';
import { StripeCardElementOptions, StripeElementsOptions } from '@stripe/stripe-js';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';
import { StripeCardComponent, StripeIdealBankComponent, StripeService } from 'ngx-stripe';
import { Observable } from 'rxjs';
import { filter, first } from 'rxjs/operators';
import { NavigationItemIds } from 'src/app/main/main.navigation';
import { AggregatorsState } from 'src/app/main/services/+state-aggregators/aggregators.state';
import { TenantStateModel } from 'src/app/main/services/tenant/tenant.models';
import { UserStateModel } from 'src/app/main/services/user/user.models';
import { BaseComponent } from 'src/app/shared/base.component';
import { BreadcrumbService } from 'src/app/shared/layout/layout-main/navigation/breadcrumb/breadcrumb.service';
import { environment } from 'src/environments/environment';



@AutoUnsubscribe()
@Component({
  selector: 'app-settings-banking',
  templateUrl: './banking.component.html',
  styleUrls: ['./banking.component.scss']
})
export class SettingsBankingComponent extends BaseComponent implements OnInit {
  @ViewChild(StripeCardComponent) card: StripeCardComponent;
  @ViewChild(StripeIdealBankComponent) idealBank: StripeIdealBankComponent;

  stripeTest: FormGroup;

  @Select(AggregatorsState.aggregatorMemberTenant)
  aggregatorMemberTenant$: Observable<{userState: UserStateModel, tenant: TenantStateModel}>;

  cardOptions: StripeCardElementOptions = {
    style: {
      base: {
        iconColor: '#666EE8',
        color: '#31325F',
        fontWeight: '300',
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSize: '18px',
        '::placeholder': {
          color: '#CFD7E0'
        }
      }
    }
  };

  elementsOptions: StripeElementsOptions = {
    locale: 'en'
  };

  constructor(breadcrumbService: BreadcrumbService, private stripeService: StripeService) {
    super();

    breadcrumbService.build(NavigationItemIds.HOME, NavigationItemIds.SETTINGS, NavigationItemIds.SETTINGS_BANKING);
  }


  async ngOnInit() {
    const stripe = (await this.stripeService.getStripeReference().pipe(filter(_ => !!_), first()).toPromise())(environment.stripeKey);
    // const instance = Stripe(environment.stripeKey);
    stripe.accounts.create({type: 'standard'});
  }


  createToken(): void {
    const name = this.stripeTest.get('name').value;
    this.stripeService
      .createToken(this.card.element, { name })
      .subscribe((result) => {
        if (result.token) {
          // Use the token
          console.log(result.token.id);
        } else if (result.error) {
          // Error creating the token
          console.log(result.error.message);
        }
      });
  }
}

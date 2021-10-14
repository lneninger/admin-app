import { Router, ActivatedRoute } from '@angular/router';
import { QuoteService } from '../../../services/quote/quote.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';
import { NavigationItemIds } from 'src/app/main/main.navigation';
import { BaseComponent } from 'src/app/shared/base.component';
import { BreadcrumbService } from 'src/app/shared/layout/layout-main/navigation/breadcrumb/breadcrumb.service';
import { AddQuoteRequest } from 'src/app/main/services/quote/quote.models';

@AutoUnsubscribe()
@Component({
  selector: 'app-quote-new',
  templateUrl: './quote-new.component.html',
  styleUrls: ['./quote-new.component.scss']
})
export class QuoteSettingsComponent extends BaseComponent implements OnInit {


  form = this.createForm();

  constructor(
    breadcrumbService: BreadcrumbService,
    private fmBuilder: FormBuilder,
    private service: QuoteService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    super();

    breadcrumbService.build(NavigationItemIds.HOME, NavigationItemIds.QUOTES, NavigationItemIds.QUOTE_NEW);
  }

  ngOnInit(): void {
  }

  createForm() {
    return this.fmBuilder.group({
      description: [],
      activateDate: [new Date(), [Validators.required]]
    });
  }


  async onSubmit(event: Event) {
    if (this.form.valid) {
      const request = this.form.getRawValue() as AddQuoteRequest;
      try {
        const response = await this.service.add(request).toPromise();
        this.router.navigate([`app/quotes/${response.id}`]);
      } catch (error) {

      }
    }
  }
}

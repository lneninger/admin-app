import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NavigationItemIds } from 'src/app/main/main.navigation';
import { AddQuoteRequest, UpdateQuoteRequest } from 'src/app/main/services/quote/quote.models';
import { QuoteService } from 'src/app/main/services/quote/quote.service';
import { BreadcrumbService } from 'src/app/shared/layout/layout-main/navigation/breadcrumb/breadcrumb.service';

@Component({
  selector: 'app-quote-update',
  templateUrl: './quote-update.component.html',
  styleUrls: ['./quote-update.component.scss']
})
export class QuoteUpdateComponent implements OnInit {

  form = this.createForm();


  fakeGrowers = [
    {label: 'Grower1', value: '1'},
    {label: 'Grower2', value: '2'},
    {label: 'Grower3', value: '3'},
    {label: 'Grower4', value: '4'},
    {label: 'Grower5', value: '5'},
    {label: 'Grower6', value: '6'},
    {label: 'Grower7', value: '7'},
    {label: 'Grower8', value: '8'},
    {label: 'Grower9', value: '9'},
  ]

  constructor(
    breadcrumbService: BreadcrumbService,
    private fmBuilder: FormBuilder,
    private service: QuoteService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    // debugger;
    breadcrumbService.build(NavigationItemIds.HOME, NavigationItemIds.QUOTES, NavigationItemIds.QUOTE_EDIT);
   }

  async ngOnInit(): Promise<void> {
  }


  createForm() {
    return this.fmBuilder.group({
      description: [],
      grower: [],
      activateDate: [new Date(), [Validators.required]]
    });
  }


  async onSubmit(event: Event) {
    if (this.form.valid) {
      const request = this.form.getRawValue() as UpdateQuoteRequest;
      try {
        const response = await this.service.update(request).toPromise();
        this.router.navigate([`app/quotes/${response.id}`]);
      } catch (error) {

      }
    }
  }

}

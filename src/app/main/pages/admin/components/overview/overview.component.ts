import { Component, OnInit } from '@angular/core';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { MemberWrapperModel } from 'src/app/main/services/member/states/member.models';
import { MemberState } from 'src/app/main/services/member/states/member.state';
import { Quote } from 'src/app/main/services/quote/quote.models';
import { QuoteService } from 'src/app/main/services/quote/quote.service';


const productContexts = [
  {
    id: 1,
    name: 'Community',
    stage: 'Eligibility',
    icon: 'fa-address-card',
    fontSet: 'far',
    notifications: true
  },
  {
    id: 2,
    name: 'Medicaid',
    stage: 'Eligibility',
    icon: 'fa-handshake',
    fontSet: 'far',
    notifications: false
  },
  {
    id: 3,
    name: 'LIS',
    stage: 'Eligibility',
    icon: 'fa-dollar-sign',
    fontSet: 'fas',
    notifications: false
  },
  {
    id: 4,
    name: 'SNAP',
    stage: 'Eligibility',
    icon: 'fa-utensils',
    fontSet: 'fas',
    notifications: true
  },
  {
    id: 5,
    name: 'Veteran',
    stage: 'ENGAGEMENT',
    icon: 'fa-flag-usa',
    fontSet: 'fas',
    notifications: true
  }
];

@Component({
  selector: 'app-quote-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit {

  productContexts = productContexts;

  @Select(QuoteService.currentQuote)
  quote$: Observable<Quote>;

  constructor() { }

  ngOnInit(): void {
  }

}

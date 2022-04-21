import { Component, OnInit, ChangeDetectionStrategy, ViewChild, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatAccordion } from '@angular/material/expansion';

export interface IPaymentCheckoutData {

}

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PaymentCheckoutDialogComponent implements OnInit {
  @ViewChild(MatAccordion) accordion: MatAccordion;

  constructor(
    @Inject(MAT_DIALOG_DATA) public config: IPaymentCheckoutData
  ) { }

  ngOnInit(): void {
  }

}

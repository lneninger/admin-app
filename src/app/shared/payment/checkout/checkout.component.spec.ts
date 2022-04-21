import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentCheckoutDialogComponent } from './checkout.component';

describe('CheckoutComponent', () => {
  let component: PaymentCheckoutDialogComponent;
  let fixture: ComponentFixture<PaymentCheckoutDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaymentCheckoutDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentCheckoutDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

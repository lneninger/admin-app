import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuoteUpdateComponent } from './quote-update.component';

describe('QuoteEditComponent', () => {
  let component: QuoteUpdateComponent;
  let fixture: ComponentFixture<QuoteUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuoteUpdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuoteUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OptionsWrapperComponent } from './options-wrapper.component';

describe('OptionsWrapperComponent', () => {
  let component: OptionsWrapperComponent;
  let fixture: ComponentFixture<OptionsWrapperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OptionsWrapperComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OptionsWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

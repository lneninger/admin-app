import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Error403Component } from './error403.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('Error403.LayoutComponent', () => {
  let component: Error403Component;
  let fixture: ComponentFixture<Error403Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
        imports: [
            RouterTestingModule
        ],
      declarations: [
          Error403Component
        ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Error403Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

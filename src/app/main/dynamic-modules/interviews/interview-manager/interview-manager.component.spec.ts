import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InterviewManagerComponent } from './interview-manager.component';

describe('InterviewManagerComponent', () => {
  let component: InterviewManagerComponent;
  let fixture: ComponentFixture<InterviewManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InterviewManagerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InterviewManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InterviewExecutionComponent } from './interview-execution.component';

describe('InterviewExecutionComponent', () => {
  let component: InterviewExecutionComponent;
  let fixture: ComponentFixture<InterviewExecutionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InterviewExecutionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InterviewExecutionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

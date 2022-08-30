import { IInterviewInstance } from './../interview-execution/models/interfaces/interface-interview-instance';
import { IInterviewConfig } from './../interview-execution/models/interview.config';
import { InterviewService } from './../interview-execution/services/interview.service';
import { TestBed } from '@angular/core/testing';
import { InterviewInstance } from './../interview-execution/models/interview-instance';
import { NgxsModule } from '@ngxs/store';



describe('Interview Service', () => {

  let interview: IInterviewInstance;
  let interviewService: InterviewService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        NgxsModule.forRoot([
          InterviewService
        ], { developmentMode: true })
      ],
      declarations: [],
      providers: [

      ]
    })
      .compileComponents();

    interviewService = TestBed.inject(InterviewService);
  });

  it(' - is not null', () => {
    expect(interviewService).toBeTruthy();
  });

  it(' - interview instance is not null', () => {
    interview = new InterviewInstance({});
    expect(interview).toBeTruthy();
  });


  it(' - interview instance is not null', () => {
    const config: IInterviewConfig = { id: 'vitae1' };
    expect(interviewService.initialize(config)).toBeTruthy();
  });

  it(' - interview instance is not null', () => {
    const config: IInterviewConfig = { id: 'vitae1' };
    interview = interviewService.initialize(config);
    expect(interview.formFields.length).toBeGreaterThan(0);
  });


});

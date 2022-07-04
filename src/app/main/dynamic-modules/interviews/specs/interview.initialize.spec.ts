import { vitae1 } from '../interview-execution/services/moked-data';
import { InterviewInstance } from './../interview-execution/models/interview-instance';



fdescribe('Interview initialization', () => {

  let interview: InterviewInstance;

  beforeEach(() => {
    interview = new InterviewInstance(vitae1);
  });

  it('is not null', () => {
    expect(interview).toBeTruthy();
  });
});

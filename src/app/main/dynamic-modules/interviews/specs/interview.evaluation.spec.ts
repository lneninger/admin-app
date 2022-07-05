import { IInterviewConfig } from '../interview-execution/models/interview.config';
import { InterviewService } from '../interview-execution/services/interview.service';
import { TestBed } from '@angular/core/testing';
import { vitae1 } from '../interview-execution/services/moked-data';
import { InterviewInstance } from '../interview-execution/models/interview-instance';
import { NgxsModule } from '@ngxs/store';
import { Interview } from '../interview-execution/evaluation/annotations/interview-annotation';
import { Category } from '../interview-execution/evaluation/annotations/category-annotation';
import { FieldsCategory } from '../interview-execution/models/interview-definition';
import { Field } from '../interview-execution/evaluation/annotations/field-annotation';

enum Genders{
  Male,
  Female
}

class PersonalFields extends FieldsCategory{
  @Field(1, 'First Name')
  firstName?: string;
  @Field(2, 'Last Name')
  lastName?: string;
  @Field(3, 'Gender')
  gender?: Genders;
}

class EducationFields extends FieldsCategory {
  name?: string;
}

@Interview()
class CVFields {

  @Category(PersonalFields, 1, 'Personal Information')
  personalFields?: PersonalFields;

  @Category(EducationFields, 2, 'Courses and Education')
  educationFields?: EducationFields;

  // test access to annotated metadata
  get categories(){
    return (this as any).$categories;
  }

  constructor(input: Partial<any>){
    Object.assign(this, input);
  }

}

fdescribe('Interview Evaluator', () => {

  let interview: InterviewInstance;
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
    interview = new InterviewInstance(vitae1);
  });

  it(' - inteview instance is not null', () => {
    const cvInterview = new CVFields({

      personalFields: {
        firstName: 'Leonardo',
        lastName: 'Neninger',
        gender: Genders.Male
      },
      educationFields: {
        name: 'Leonardo'
      },
    });

    expect(cvInterview).toBeTruthy();
  });

  it(' - interview categories is not null', () => {
    const cvInterview = new CVFields({

      personalFields: {
        firstName: 'Leonardo',
        lastName: 'Neninger',
        gender: Genders.Male
      },
      educationFields: {
        name: 'Leonardo'
      },
    });
    expect(cvInterview.personalFields?.metadata).not.toEqual(null);
    expect(cvInterview.educationFields?.metadata).not.toEqual(null);
  });


  it(' - categories are not null', () => {
    const cvInterview = new CVFields({

      personalFields: {
        firstName: 'Leonardo',
        lastName: 'Neninger',
        gender: Genders.Male
      },
      educationFields: {
        name: 'Leonardo'
      },
    });
    expect(cvInterview.categories).not.toEqual(null);
  });

});

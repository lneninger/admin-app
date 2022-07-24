import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { IInterviewEvaluateRequest, InterviewEvaluationAction } from '../../../../../../functions/src/_services/interviews/models/interview-evaluation-response';
import { IInterviewCategory } from './models/interview-category';
import { IInterviewInstance } from './models/interview-instance';
import { IInterviewConfig } from './models/interview.config';
import { InterviewService } from './services/interview.service';

@Component({
  selector: 'app-interview-execution',
  templateUrl: './interview-execution.component.html',
  styleUrls: ['./interview-execution.component.scss']
})
export class InterviewExecutionComponent implements OnInit, AfterViewInit {

  form = this.fmBuilder.group({
    name: null,
    price: null
  });
  interview: IInterviewInstance;

  private _currentCategory: IInterviewCategory;
  get currentCategory(): IInterviewCategory {
    return this._currentCategory;
  }

  @Input() config: IInterviewConfig = { id: 'vitae1' };

  InterviewEvaluationAction = InterviewEvaluationAction;

  constructor(
    private fmBuilder: FormBuilder,
    private service: InterviewService
  ) { }


  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.initializeInterview();
    }, 0);
  }
  initializeInterview() {
    this.interview = this.service.initialize(this.config);
    this._currentCategory = this.interview.categories.find(item => item.name === this.interview.currentCategory);
  }

  onPage(action: InterviewEvaluationAction) {
    const req: IInterviewEvaluateRequest = {
      action,
    };
    this.service.evaluate(req, this.interview);
  }
}

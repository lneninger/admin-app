import { InterviewService } from './services/interview.service';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { IExecutingInterview } from './models/executing-interview';
import { IInterviewCategory } from './models/interview-category';

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
  executingInterview: IExecutingInterview;

  private _currentCategory: IInterviewCategory;
  get currentCategory(): IInterviewCategory{
    return this._currentCategory;
  }

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
    const evaluationResult = this.executingInterview = this.service.initialize({id: 'vitae1'});
    this.executingInterview = evaluationResult;
    this._currentCategory = this.executingInterview.categories.find(item => item.id === evaluationResult.currentCategory);

  }

}

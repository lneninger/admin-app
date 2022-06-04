import { InterviewService } from './services/interview.service';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { IExecutingInterview } from './models/executing-interview';

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
    this.executingInterview = this.service.getInterview('vitae1');
  }

}

import { Injectable } from '@angular/core';
import { IExecutingInterview } from '../models/executing-interview';
import { vitae1 } from './moked-data';

@Injectable({
  providedIn: 'root'
})
export class InterviewService {

  constructor() {

  }


  getInterview(id: string): IExecutingInterview {
    return vitae1;
  }
}

import { Injectable, EventEmitter } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { BaseHandler } from './template.factory.service';

@Injectable({
    providedIn: 'root'
})
export class TemplateService {
  onValueChanged: EventEmitter<BaseHandler>;

    constructor(public fmBuilder: FormBuilder) {
    this.onValueChanged = new EventEmitter<BaseHandler>();
  }
}

import { FormGroup } from '@angular/forms';
import { IInterviewInstance } from '../models/interfaces/interface-interview-instance';
import { FormField } from './_base-formfield';
import { formFieldControlMapping } from './_mapping-formfield';

export class FormFields extends Array<FormField>{
  form: FormGroup;


  constructor(private interviewRef: IInterviewInstance){
    super();

    this.form = new FormGroup({
    });
  }

  formatFormField(name: string) {
    const field = this.interviewRef.currentPageFields.find(item => item.name === name);
    const fieldStatus = this.interviewRef.formFields.find(item => item.fieldName === name);

    let fieldItem = this.find(item => item.fieldName === field.name);
    if (!fieldItem) {
      const fieldType = formFieldControlMapping.get(field.metadata.control);
      fieldItem = new fieldType(this.interviewRef, field);
      this.push(fieldItem);
    }

    fieldItem.format();
  }
}

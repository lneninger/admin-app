import { FormControl } from '@angular/forms';
import { IInterviewFieldStatus } from '../models/executing-interview';
import { FormFields, IInterviewField } from '../models/interview-field';

export interface IFormField {

}
export abstract class FormField implements IFormField {
  fieldStatus: IInterviewFieldStatus;
  formControl: FormControl;
  get fieldName() {
    return this.field.name
  }
  constructor(private formFields: FormFields, private field: IInterviewField) {

  }

  format(fieldStatus: IInterviewFieldStatus) {
    this.fieldStatus = fieldStatus;
  }

  destroy() {
    this.formFields.form.removeControl(this.fieldStatus.name);
  }
}


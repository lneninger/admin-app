import { FormControl } from '@angular/forms';
import { IInterviewField } from '../models/interfaces/interface-interview-field';
import { FormFields } from './_form-fields';

export interface IFormField {

}
export abstract class FormField implements IFormField {
  formControl: FormControl;
  get fieldName() {
    return this.field.name
  }
  constructor(private formFields: FormFields, private field: IInterviewField) {

  }

  format() {
  }

  destroy() {
    this.formFields.form.removeControl(this.fieldName);
  }
}


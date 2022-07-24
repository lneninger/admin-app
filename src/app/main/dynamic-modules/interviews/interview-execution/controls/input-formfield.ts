import { InterviewField } from '../models/interview-field';
import { FormField } from './_base-formfield';
import { FormFields } from './_form-fields';

export class InputFormField extends FormField {
  constructor(formFields: FormFields, field: InterviewField) {
    super(formFields, field);
  }
}

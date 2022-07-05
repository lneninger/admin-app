import { FormFields, IInterviewField } from '../models/interview-field';
import { FormField } from './_base-formfield';

export class RadioListFormField extends FormField {
  constructor(formFields: FormFields, field: IInterviewField) {
    super(formFields, field);
  }
}

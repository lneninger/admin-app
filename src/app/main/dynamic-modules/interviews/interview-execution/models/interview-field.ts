import { Type } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { IInterviewFieldStatus } from './executing-interview';
import { IInterviewInstance } from './interview-instance';

export interface IInterviewFieldDefinition {
  name: string;
  label: string;
  description: string;
  metadata: IInterviewFieldMetadata;
  validators: IInterviewValidatorDefinition[]
}

export interface IInterviewValidatorDefinition {
  id: string;
  rule: (fieldStatus: IInterviewFieldStatus, fieldStatusList: IInterviewFieldStatus[]) => InterviewFieldEvalution;
  message: string;
}

export interface IInterviewField {
  name: string;
  label: string;
  description: string;
  metadata: IInterviewFieldMetadata;
}

export class InterviewField implements IInterviewField {
  name: string;
  label: string;
  description: string;
  metadata: IInterviewFieldMetadata;

  constructor(input: Partial<IInterviewField>) {
    Object.assign(this, input);
  }
}


export interface IInterviewFieldMetadata {
  control: ControlTypeNames,
  controlDataProvider?: any;
}


export interface InterviewFieldEvalution {
  type: 'evaluation' | 'disqualification',
  message: string;
}

export class InterviewFieldsEvalutionResult extends Array<InterviewFieldEvalution>{


}

export class FormFields extends Array<FormField>{
  formatFormField(interview: IInterviewInstance, field: IInterviewField, fieldStatus: IInterviewFieldStatus) {
    let fieldItem = this.find(item => item.fieldName);
    if (!fieldItem) {
      const fieldType = formFieldControlMapping[field.metadata.control];
      fieldItem = new fieldType(interview, field);
    }
    fieldItem.format(fieldStatus);
  }
}

export interface IFormField {

}
export abstract class FormField implements IFormField {
  fieldStatus: IInterviewFieldStatus;
  formControl: FormControl;
  get fieldName() {
    return this.field.name
  }
  constructor(private interview: IInterviewInstance, private field: IInterviewField) {

  }

  format(fieldStatus: IInterviewFieldStatus) {
    this.fieldStatus = fieldStatus;
  }

  destroy() {
    this.interview.form.removeControl(this.fieldStatus.name);
  }
}

export class InputFormField extends FormField {
}



const formFieldControlMapping = new Map<ControlTypeNames, Type<FormField>>([
  ['INPUT', InputFormField]
]);
export declare type ControlTypeNames = 'INPUT' | 'CHECKBOX' | 'CHECKBOXLIST' | 'RADIO' | 'RADIOLIST' | 'BOOLEAN' | 'NULLABLEBOOLEAN' | 'SELECT' | 'MULTISELECT' | 'DATE' | 'DATERANGE';

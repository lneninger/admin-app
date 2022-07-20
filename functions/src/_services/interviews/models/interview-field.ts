import { FormGroup } from '@angular/forms';
import { FormField } from '../controls/_base-formfield';
import { ControlTypeNames, formFieldControlMapping } from '../controls/_mapping-formfield';
import { IItemEvaluationResult } from '../evaluation/services/evaluator.models';
import { IInterviewFieldStatus } from './executing-interview';
import { IInterviewInstance } from './interview-instance';

export interface IInterviewFieldDefinition {
  name: string;
  label: string;
  description: string;
  metadata: IInterviewFieldMetadata;
  evaluators: IEvaluatorDefinition[]
}

export interface IEvaluatorDefinition {
  id: string;
  type: 'VALIDATION',
  rule: IInterviewValidatorRuleDefinition,
  message: string;
}


export interface IInterviewValidatorRuleDefinition{
  expression: string,
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





export class FormFields extends Array<FormField>{
  form: FormGroup;


  constructor(private interviewRef: IInterviewInstance){
    super();

    this.form = new FormGroup({
    });
  }

  formatFormField(name: string) {
    const field = this.interviewRef.currentPageFields.find(item => item.name === name);
    const fieldStatus = this.interviewRef.fieldStatus.find(item => item.name === name);

    let fieldItem = this.find(item => item.fieldName === field.name);
    if (!fieldItem) {
      const fieldType = formFieldControlMapping.get(field.metadata.control);
      fieldItem = new fieldType(this.interviewRef, field);
      this.push(fieldItem);
    }

    fieldItem.format(fieldStatus);
  }
}










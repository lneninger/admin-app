import { IInterviewFieldStatus } from './executing-interview';

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
}

export class InterviewField implements IInterviewField {
  name: string;
  label: string;
  description: string;

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

export declare type ControlTypeNames = 'INPUT' | 'CHECKBOX' | 'CHECKBOXLIST' | 'RADIO' | 'RADIOLIST' | 'BOOLEAN' | 'NULLABLEBOOLEAN' | 'SELECT' | 'MULTISELECT' | 'DATE' | 'DATERANGE';

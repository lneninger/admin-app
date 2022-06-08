
export interface IInterviewFieldDefinition {
  id: string;
  label: string;
  description: string;
  metadata: IInterviewFieldMetadata;
  validators: IInterviewValidatorDefinition[]
}

export interface IInterviewValidatorDefinition{
  id: string;
  rule: () => boolean;
  message: string;
}

export interface IInterviewField {
  id: string;
  label: string;
  description: string;
  metadata: IInterviewFieldMetadata;
}

export class InterviewField implements IInterviewField {
  id: string;
  label: string;
  description: string;
  metadata: IInterviewFieldMetadata;

  constructor(input: Partial<IInterviewField>) {
    Object.assign(this, input);
  }
}


export interface IInterviewFieldMetadata{
  control: ControlTypeNames,
  controlDataProvider?: any;
}

export declare type ControlTypeNames = 'INPUT' | 'CHECKBOX' | 'CHECKBOXLIST' | 'RADIO'  | 'RADIOLIST' | 'BOOLEAN' | 'NULLABLEBOOLEAN' | 'SELECT' | 'MULTISELECT' | 'DATE' | 'DATERANGE';

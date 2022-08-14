import { ControlTypeNames } from './control-mapping';

export interface IInterviewFieldDefinition {
  name: string;
  label: string;
  description: string | undefined;
  metadata: IInterviewFieldMetadata;
  evaluators: IEvaluatorDefinition[]
}

export interface IEvaluatorDefinition {
  id: string;
  type: EvaluationType;
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
  name!: string;
  label!: string;
  description!: string;
  metadata!: IInterviewFieldMetadata;

  constructor(input: Partial<IInterviewField>) {
    Object.assign(this, input);
  }
}


export interface IInterviewFieldMetadata {
  control: ControlTypeNames,
  controlDataProvider?: any;
}


export declare type EvaluationType = 'VALIDATION' | 'DISQUALIFICATION' | 'DISABLE' | 'HIDE';












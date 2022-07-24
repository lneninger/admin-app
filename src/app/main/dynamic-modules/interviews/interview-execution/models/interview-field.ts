import { ControlTypeNames } from 'functions/src/_services/interviews/models/control-mapping';
import { IItemEvaluationResult } from './interfaces/interface-evaluation-result';
import { IInterviewField } from './interfaces/interface-interview-field';

export class InterviewField implements IInterviewField{
  name: string;
  label: string;
  description: string;
  metadata: IInterviewFieldMetadata;
  evaluationResult: IItemEvaluationResult[]

}

export interface IInterviewFieldMetadata {
  control: ControlTypeNames,
  controlDataProvider?: any;
}



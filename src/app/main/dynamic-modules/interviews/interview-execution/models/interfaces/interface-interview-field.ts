import { IInterviewFieldMetadata } from '../interview-field';
import { IItemEvaluationResult } from './interface-evaluation-result';

export interface IInterviewField{
  name: string;
  label: string;
  description: string;
  metadata: IInterviewFieldMetadata;
  evaluationResult: IItemEvaluationResult[]
}

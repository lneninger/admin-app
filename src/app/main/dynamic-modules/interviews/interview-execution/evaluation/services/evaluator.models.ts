import { IEvaluatorDefinition } from '../../models/interview-field';

export interface IEvaluatorResut {
  continue: boolean;
  evaluationResult: any;
}

export interface IFieldEvaluationResult{
  evaluator: IEvaluatorDefinition,
  evaluationResult: IEvaluatorResut
}

export class FieldEvalutionResultArray extends Array<IFieldEvaluationResult>{

}


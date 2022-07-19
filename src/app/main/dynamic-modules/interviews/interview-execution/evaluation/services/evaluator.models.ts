import { IEvaluatorDefinition } from '../../models/interview-field';

export interface IEvaluatorDefinitionCompilation extends IEvaluatorDefinition {
  compilation: (evaluator: IEvaluatorDefinition, target: { [key: string]: any }) => IFieldEvaluationResult;
}

export enum EvaluationLevel{
  Category = 'Category',
  Page = 'Page',
  Field = 'Field'
}

export interface IFieldEvaluationResult{
  name: string;
  level: EvaluationLevel;
  evaluator: IEvaluatorDefinitionCompilation,
  evaluationResult: IEvaluatorResut
}

export interface IEvaluatorResut {
  continue: boolean;
  evaluationResult: any;
}


export class FieldEvalutionResultArray extends Array<IFieldEvaluationResult>{

}


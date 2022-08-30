import { EvaluationType, IEvaluatorDefinition } from '../../models/interview-field';

export interface IEvaluatorDefinitionCompilation extends IEvaluatorDefinition {
  compilation: (evaluator: IEvaluatorDefinition, target: { [key: string]: any }) => IEvaluatorResult;
}

export enum EvaluationLevel {
  Category = 'Category',
  Page = 'Page',
  Field = 'Field'
}

export interface IItemEvaluationResult {
  name: string;
  level: EvaluationLevel;
  evaluations: IEvaluationResultItem[]
}


export interface IItemEvaluationResultGrouping {
  status: EvaluationType;
  fails: IEvaluationResultItem[];
  errors: IEvaluationResultItem[];
  disqualifications: IEvaluationResultItem[];
  valids: IEvaluationResultItem[];
}



export interface IEvaluationResultItem{
  evaluator: IEvaluatorDefinitionCompilation,
  evaluationResult: IEvaluatorResult
}


export interface IEvaluatorResult {
  continue: boolean;
  evaluationResult: any;
}


import { EvaluationLevel } from 'functions/src/_services/interviews/evaluation/services/evaluator.models';
import { EvaluationType } from 'functions/src/_services/interviews/models/interview-field';

export interface IItemEvaluationResult {
  name: string;
  level: EvaluationLevel;
  type: EvaluationType;
  hint: string;
  evaluations: IItemEvaluationResult[]
}


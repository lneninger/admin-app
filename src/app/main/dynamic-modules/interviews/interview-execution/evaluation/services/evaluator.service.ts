import { IPersistedInterviewFieldStatus } from '../../models/executing-interview';
import { InterviewDefinition } from './../../models/interview-definition';
import { compileExpression } from 'filtrex';
import { toFunction } from 'async-rule-evaluator';
import { FieldEvalutionResultArray, IFieldEvaluationResult, } from './evaluator.models';
import { IEvaluatorDefinition } from '../../models/interview-field';

export interface IEValuatorService {

}


// function trim(s: string) {
//   return s.trim();
// }

// function length(s: string) {
//   return s.length;
// }

let options = {
  functions: { /*trim*/ }
};

export class EvaluatorService implements IEValuatorService {
  constructor(private interviewDefinition: InterviewDefinition, private interviewFieldStatus: IPersistedInterviewFieldStatus[]) {
  }

  evaluateField(fieldIdentifier: string) {
    const fieldDefinition = this.interviewDefinition.getFieldDefinition(fieldIdentifier);
    const rulesExec = fieldDefinition?.validators.map(evaluator => {
      return ({ func: this.buildCompiledEvaluation(), evaluator });
    }) || [];

    const fieldEvaluationResults: FieldEvalutionResultArray = [];
    for (let ruleExec of rulesExec) {
      const evaluationResult = ruleExec.func(ruleExec.evaluator);
      fieldEvaluationResults.push(evaluationResult);
    }
    return fieldEvaluationResults;
  }

  private buildCompiledEvaluation() {
    return (evaluator: IEvaluatorDefinition): IFieldEvaluationResult => {
      let compiledEvaluator: any;
      try {

        compiledEvaluator = compileExpression(evaluator.rule.expression/*, options*/);
        // compiledEvaluator = toFunction(evaluator.rule.expression/*, options*/);
      } catch (ex) {
        console.log(`Error running evaluator => `, ex);
        throw ex;
      }
      const evaluationResult = compiledEvaluator(this.interviewFieldStatus);
      const continueEvaluation = evaluationResult === 1 || this.continueEvaluation();
      return ({ evaluator, evaluationResult: { continue: continueEvaluation, evaluationResult } });
    };

  }

  private continueEvaluation(): boolean {
    return true;
  }
}

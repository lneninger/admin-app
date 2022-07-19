import { IInterviewFieldDefinition } from './../../models/interview-field';
import { IPersistedInterviewFieldStatus } from '../../models/executing-interview';
import { InterviewDefinition } from './../../models/interview-definition';
import { compileExpression } from 'filtrex';
import { FieldEvalutionResultArray, IFieldEvaluationResult, IEvaluatorDefinitionCompilation, EvaluationLevel } from './evaluator.models';
import { IEvaluatorDefinition } from '../../models/interview-field';

export interface IEValuatorService {

}


function trim(s: string) {
  return s.trim();
}

function length(s: string) {
  return s.length;
}

let options = {
  extraFunctions: { trim, length }
};

export class EvaluatorService implements IEValuatorService {
  readonly evaluatables: { name: string; level: EvaluationLevel; evaluators: IEvaluatorDefinitionCompilation[]; }[];
  constructor(private interviewDefinition: InterviewDefinition, private interviewFieldStatus: IPersistedInterviewFieldStatus[]) {
    // get evaluatable interview elements from definition. Which are Categories and Fields
    const evaluatables = this.getEvaluatables();

    // prepate evaluatable elements fo evaluation
    this.evaluatables = this.formatEvaluatables(evaluatables);
  }
  private getEvaluatables(): { name: string; level: EvaluationLevel; evaluators: IEvaluatorDefinition[] }[] {
    const result: { name: string, level: EvaluationLevel, evaluators: IEvaluatorDefinition[] }[] = [];
    for (let category of this.interviewDefinition.categories) {
      result.push({ name: category.name, level: EvaluationLevel.Category, evaluators: category.evaluators });
      if (category.pages) {
        for (let page of category.pages) {
          if (page.fields) {
            for (let field of page.fields) {
              result.push({ name: field.name, level: EvaluationLevel.Field, evaluators: field.evaluators });
            }
          }
        }
      }
    }

    return result;
  }

  private formatEvaluatables(evaluatables: { name: string; level: EvaluationLevel; evaluators: IEvaluatorDefinition[] }[]): { name: string; level: EvaluationLevel; evaluators: IEvaluatorDefinitionCompilation[] }[] {
    return evaluatables.map(evaluatable => {
      const itemResult: { name: string, level: EvaluationLevel, evaluators: IEvaluatorDefinitionCompilation[] } = { name: evaluatable.name, level: evaluatable.level, evaluators:[] };
      itemResult.evaluators = itemResult.evaluators.map(evaluator => {
        return ({ ...evaluator, compilation: this.buildCompiledEvaluation() });
      }) || [];

      return itemResult;
    });
  }

  evaluateInterview() {
    // get values from interview status
    const fieldValues: { [key: string]: any } = {};
    (this.interviewFieldStatus || []).forEach(field => {
      fieldValues[field.name] = field.value
    });

    // Evaluate
    const fieldEvaluationResults: FieldEvalutionResultArray = [];
    for (let evaluatable of this.evaluatables) {
      for(let evaluator of evaluatable.evaluators){
        const evaluationResult = evaluator.compilation(evaluator, fieldValues);
        fieldEvaluationResults.push({name: evaluatable.name, level: evaluatable.level, ...evaluationResult});
      }

    }

    return fieldEvaluationResults;
  }

  evaluateItem(item: string | { [key: string]: any }) {
    if (item) {
      let fieldDefinition: {
        name: string;
        level: EvaluationLevel;
        evaluators: IEvaluatorDefinitionCompilation[];
    };
      let internalField: { [key: string]: any };
      if (typeof item === 'string') {
        fieldDefinition = this.evaluatables.find(evaluatableItem => evaluatableItem.name === item);
        const fieldStatus = this.interviewFieldStatus.find(statusItem => statusItem.name === item);
        internalField = {};
        internalField[item] = fieldStatus?.value;
      } else {
        fieldDefinition = this.evaluatables.find(statusItem => statusItem.name === Object.getOwnPropertyNames(item)[0]);
        internalField = item;
      }

      const fieldEvaluationResults: FieldEvalutionResultArray = [];
      for (let evaluatorCompilation of fieldDefinition.evaluators) {
        const evaluationResult = evaluatorCompilation.compilation(evaluatorCompilation, internalField);
        fieldEvaluationResults.push(evaluationResult);
      }
      return fieldEvaluationResults;
    }
  }

  private buildCompiledEvaluation(): (evaluator: IEvaluatorDefinition, target: { [key: string]: any }) => IFieldEvaluationResult {
    return (evaluator: IEvaluatorDefinition, target: { [key: string]: any }): IFieldEvaluationResult => {
      let compiledEvaluator: any;
      try {

        compiledEvaluator = compileExpression(evaluator.rule.expression, options);
        // compiledEvaluator = toFunction(evaluator.rule.expression/*, options*/);
      } catch (ex) {
        console.log(`Error running evaluator => `, ex);
        throw ex;
      }
      const evaluationResult = compiledEvaluator(target);
      if (evaluationResult.name?.toUpperCase() === 'REFERENCEERROR') {
        throw evaluationResult;
      } else {
        const continueEvaluation = evaluationResult || this.continueEvaluation(evaluator);
        return ({ evaluator, evaluationResult: { continue: continueEvaluation, evaluationResult } });
      }
    };

  }

  private continueEvaluation(evaluator: IEvaluatorDefinition): boolean {
    return true;
  }
}

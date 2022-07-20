import { compileExpression } from 'filtrex';
import { IPersistedInterviewFieldStatus } from '../../models/executing-interview';
import { IEvaluatorDefinition } from '../../models/interview-field';
import { InterviewDefinition } from './../../models/interview-definition';
import { EvaluationLevel, FieldEvalutionResultArray, IEvaluatorDefinitionCompilation, IEvaluatorResult, IItemEvaluationResult } from './evaluator.models';

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
      const itemResult: { name: string, level: EvaluationLevel, evaluators: IEvaluatorDefinitionCompilation[] } = { name: evaluatable.name, level: evaluatable.level, evaluators: [] };
      itemResult.evaluators = evaluatable.evaluators?.map(evaluator => {
        return { ...evaluator, compilation: this.buildCompiledEvaluation() };
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
    const fieldEvaluationResults: IItemEvaluationResult[] = [];
    for (let evaluatable of this.evaluatables) {
      const fieldEvaluationResult: IItemEvaluationResult = {name: evaluatable.name, level: evaluatable.level, evaluations: []};
      for (let evaluator of evaluatable.evaluators) {
        const evaluationResult = evaluator.compilation(evaluator, fieldValues);
        fieldEvaluationResult.evaluations.push({ evaluator: evaluator, evaluationResult: evaluationResult });
      }
      fieldEvaluationResults.push(fieldEvaluationResult);
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

      const fieldEvaluationResult: IItemEvaluationResult = {name: fieldDefinition.name, level: fieldDefinition.level, evaluations: []};
      for (let evaluatorCompilation of fieldDefinition.evaluators) {
        const evaluationResult = evaluatorCompilation.compilation(evaluatorCompilation, internalField);
        fieldEvaluationResult.evaluations.push({ evaluator: evaluatorCompilation, evaluationResult });
      }
      return fieldEvaluationResult;
    }
  }

  private buildCompiledEvaluation(): (evaluator: IEvaluatorDefinition, target: { [key: string]: any }) => IEvaluatorResult {
    return (evaluator: IEvaluatorDefinition, target: { [key: string]: any }): IEvaluatorResult => {
      let compiledEvaluator: any;
      try {
        compiledEvaluator = compileExpression(evaluator.rule.expression, options);
      } catch (ex) {
        console.log(`Error running evaluator => `, ex);
        const error = new Error(`${ex.message} ${evaluator.rule.expression}`);
        error.stack = ex.stack;
        error.name = ex.name;
        throw error;
      }
      const evaluationResult = compiledEvaluator(target);
      if (evaluationResult.name?.toUpperCase() === 'REFERENCEERROR') {
        const falsePositive = ['UNKNOWN_PROPERTY'];
        if (falsePositive.indexOf(evaluationResult.I18N_STRING) === -1) {
          throw evaluationResult;
        } else {
          return ({ continue: true, evaluationResult });
        }
      } else {
        const continueEvaluation = evaluationResult || this.continueEvaluation(evaluator);
        return ({ continue: continueEvaluation, evaluationResult });
      }
    };

  }

  private continueEvaluation(evaluator: IEvaluatorDefinition): boolean {
    return true;
  }
}

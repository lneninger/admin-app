import { compileExpression } from 'filtrex';
import { IEvaluatorDefinition } from '../../models/interview-field';
import { InterviewDefinition } from './../../models/interview-definition';
import { EvaluationLevel, IEvaluatorDefinitionCompilation, IEvaluatorResult, IItemEvaluationResult } from './evaluator.models';

export interface IEvaluatorService {
  evaluateInterview(): IItemEvaluationResult[];
}


function trim(s: string) {
  return s.trim();
}

function length(s: string) {
  return s.length;
}

const options = {
  extraFunctions: { trim, length }
};

export class EvaluatorService implements IEvaluatorService {
  readonly evaluatables: { name: string; level: EvaluationLevel; evaluators: IEvaluatorDefinitionCompilation[]; }[];
  constructor(private values: any, private interviewDefinition: InterviewDefinition) {
    // get evaluatable interview elements from definition. Which are Categories and Fields
    const evaluatables = this.getEvaluatables();

    // prepate evaluatable elements fo evaluation
    this.evaluatables = this.formatEvaluatables(evaluatables);
  }
  private getEvaluatables(): { name: string; level: EvaluationLevel; evaluators: IEvaluatorDefinition[] }[] {
    const result: { name: string, level: EvaluationLevel, evaluators: IEvaluatorDefinition[] }[] = [];
    for (const category of this.interviewDefinition.categories) {
      result.push({ name: category.name, level: EvaluationLevel.Category, evaluators: category.evaluators });
      if (category.pages) {
        for (const page of category.pages) {
          if (page.fields) {
            for (const field of page.fields) {
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

  evaluateInterview(): IItemEvaluationResult[] {
    // Evaluate
    const fieldEvaluationResults: IItemEvaluationResult[] = [];
    for (const evaluatable of this.evaluatables) {
      const fieldEvaluationResult: IItemEvaluationResult = { name: evaluatable.name, level: evaluatable.level, evaluations: [] };
      for (const evaluator of evaluatable.evaluators) {
        const evaluationResult = evaluator.compilation(evaluator, this.values);
        fieldEvaluationResult.evaluations.push({ evaluator: evaluator, evaluationResult: evaluationResult });
      }
      fieldEvaluationResults.push(fieldEvaluationResult);
    }

    return fieldEvaluationResults;
  }

  evaluateItem(item: string | { [key: string]: any }): IItemEvaluationResult | undefined {
    if (item) {
      let evaluatable: {
        name: string;
        level: EvaluationLevel;
        evaluators: IEvaluatorDefinitionCompilation[];
      } | undefined;
      let internalField: { [key: string]: any };
      if (typeof item === 'string') {
        evaluatable = this.evaluatables.find(evaluatableItem => evaluatableItem.name === item);
        internalField = {};
        internalField[item] = this.values[item];
      } else {
        evaluatable = this.evaluatables.find(statusItem => statusItem.name === Object.getOwnPropertyNames(item)[0]);
        internalField = item;
      }

      if (evaluatable) {
        const fieldEvaluationResult: IItemEvaluationResult = { name: evaluatable.name, level: evaluatable.level, evaluations: [] };
        for (const evaluatorCompilation of evaluatable?.evaluators) {
          const evaluationResult = evaluatorCompilation.compilation(evaluatorCompilation, internalField);
          fieldEvaluationResult.evaluations.push({ evaluator: evaluatorCompilation, evaluationResult });
        }
        return fieldEvaluationResult;
      }
    }

    return undefined;
  }

  private buildCompiledEvaluation(): (evaluator: IEvaluatorDefinition, target: { [key: string]: any }) => IEvaluatorResult {
    return (evaluator: IEvaluatorDefinition, target: { [key: string]: any }): IEvaluatorResult => {
      let compiledEvaluator: any;
      try {
        compiledEvaluator = compileExpression(evaluator.rule.expression, options);
      } catch (ex: any) {
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

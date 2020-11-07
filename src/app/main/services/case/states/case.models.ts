import { ProductCategoryList } from 'src/app/main/shared/general.models';
import { EnumItem } from 'src/app/shared/general.models';
import { AssessmentType, IInterviewResult } from '../../interview/interview.models';

export const EnrollmentStages: string[] = ['AwaitingInterview', 'PreparingApplication', 'InProgress'];
export const InterviewInProgressStages: string[] = ['PreparingApplication', 'InProgress'];


export class CaseModel {
  active: boolean;
  caseId: string;
  externalId: string;
  customMetadata: any;
  currentStage: string;
  currentStageMetadata: any;
  productId: string;
  productName: string;
  productDescription: string;
  currentStageCreatedOn?: Date;
  productCategoryId: string;
  productCategoryName: string;
  currentStageIndex: number;
  currentStageItem: ICaseStageEnum;
  nextStageItem: ICaseStageEnum;
  currentStageIsLast: boolean;

  stages: ICaseStageEnum[];
  sortedAvailableStages: ICaseStageEnum[];
  currentStageAssessmentType: AssessmentType;
  currentStageCompletion: number;
  currentStageLastUpdatingUser: string;
  currentStageResult: IInterviewResult;
  isEnrollmentInterviewStage: string;

  constructor(input?: Partial<CaseModel>) {
      if (!input) {
          return;
      }

      Object.assign(this, input);
      // this.active = internal.active;
      // this.caseId = internal.caseId;
      // this.customMetadata = internal.customMetadata;
      // this.externalId = internal.externalId;
      // this.productId = internal.productId;
      // this.productName = internal.productName;
      // this.currentStageCreatedOn = internal.currentStageCreatedOn;
      // this.productDescription = internal.productDescription;
      // this.productCategoryId = internal.productCategoryId;
      // this.productCategoryName = internal.productCategoryName;

      const internal = (input || {}) as CaseModel;
      this.stages = internal.stages as ICaseStageEnum[];

      this.sortedAvailableStages = this.stages && this.stages
          .sort((item1, item2) => {
              return item1.order < item2.order ? -1 : (item1.order > item2.order ? 1 : 0);
          });

      this.currentStageAssessmentType = internal.currentStageAssessmentType as AssessmentType;


      this.setCurrentStage(internal.currentStage, internal.currentStageMetadata, (internal as any).currentStageStatus);
  }



  static addStage(stage: string, synonyms?: string[]): EnumItem<string> {
      const result = {
          key: CaseModel.formatStageKey(stage), value: stage.toUpperCase(), extras: {}
      } as EnumItem<string>;

      result.extras.synonyms = [result.key];
      if (synonyms) {
          result.extras.synonyms = [...result.extras.synonyms, ...(synonyms.map(synonymItem => synonymItem.toLocaleLowerCase()))];
      }

      return result;
  }

  static formatStageKey(stage: string): string {
      return stage ? stage.toLowerCase().replace(' ', '_') : null;
  }

  static normalizeProductCategoryIdentifier(productCategoryName: string): string {
      return ProductCategoryList.find(productCategoryItem => productCategoryName.toLowerCase().indexOf(productCategoryItem) >= 0);
  }

  setCurrentStage(stageId: string, metadata: any, status: any = null) {
      this.currentStage = stageId;
      this.currentStageMetadata = metadata;
      this.currentStageIndex = this.getCurrentStageIndex();
      // debugger;
      this.currentStageItem = this.getCurrentStageItem();

      this.nextStageItem = this.getNextStageItem();
      this.currentStageIsLast = this.getCurrentStageIsLast();

      if (status) {
          if (status.progress) {
              const progress = status.progress;
              this.currentStageCompletion = progress && progress.completion as number;
              if (this.currentStageCompletion) {
                  this.currentStageCompletion = Math.round(Math.abs(this.currentStageCompletion));
              }

              this.currentStageLastUpdatingUser = progress.lastUpdatingUser as string;
          }


          // debugger;
          if (status.result) {
              const result = status.result;

              this.currentStageResult = result as IInterviewResult;
          }
      }

      this.isEnrollmentInterviewStage = EnrollmentStages.find(stageItem => stageItem === stageId);
  }

  getCurrentStageItem(): ICaseStageEnum {
      return this.sortedAvailableStages && this.sortedAvailableStages.find(stageItem => stageItem.id === this.currentStage);
  }

  getNextStageItem(): ICaseStageEnum {
      return this.sortedAvailableStages ? this.sortedAvailableStages.length > this.currentStageIndex + 1 && this.sortedAvailableStages[this.currentStageIndex + 1] : null;
  }

  getCurrentStageIndex() {
      return this.stages && this.stages.findIndex(stage => stage.id === this.currentStage);
  }

  findStageIndex(stageId: string) {
      return this.stages && this.stages.findIndex(stage => stage.id === stageId);
  }

  findStage(stageId: string): ICaseStageEnum {
      const stageIndex = this.findStageIndex(stageId);
      return stageIndex && stageIndex !== -1 && this.stages[stageIndex];
  }

  getCurrentStageIsLast(): boolean {
      return this.stages && this.stages.findIndex(stage => stage.id === this.currentStage) === this.stages.length - 1;
  }
}


export interface ICaseStageEnum {
  id: string;
  description: string;
  order: number;
  disableManual: boolean;
  data?: CaseStageModel[];
  allowedRollbackCaseStages: string[];
}

export class CaseStageModel {
  metadata?: any;
}

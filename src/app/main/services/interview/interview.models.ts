import { EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BehaviorSubject, Observable, Subject, Subscription } from 'rxjs';
import { first } from 'rxjs/operators';
import { Address, IAddress } from '../address/states/address.models';
import { CaseModel } from '../case/states/case.models';
import { Member } from '../member/states/member.models';
import { InterviewManager } from './interview.manager';
import { BaseHandler } from './template.factory.service';
import { CompletionProcess, DisplayMetadata, IDisplayMetadata } from './template.models';


export enum InterviewOrchestrationTypes {
  CustomUHC = 'CustomUHC'
}


export enum EvaluationSeverityMode {
  Lineant = 'Lineant',
  Strict = 'Strict'
}

export class EvaluationServerityDescriptions {

  static descriptions: { type: EvaluationSeverityMode, description: string }[] = [
      {
          type: EvaluationSeverityMode.Strict,
          description: 'State Mode'
      },
      {
          type: EvaluationSeverityMode.Lineant,
          description: 'Member Mode'
      }
  ];

  static getDescription(type: EvaluationSeverityMode) {
      const selected = EvaluationServerityDescriptions.descriptions.find(descItem => descItem.type === type);
      return selected && selected.description;
  }
}


export interface AvailableInterviewRequest {
  address: IAddress;
  tenantId: string;
  member: Member;
  interviewType: InterviewType;
  entityType: EntityType;
  entityId: string;
}

export interface InterviewOrchestrationRequest {
  orchestration: {
      mode: 'Manual';
      type: InterviewOrchestrationTypes;
  };
  interview: InterviewGlobalMetadata;

}

export interface InterviewOrchestration {
  externalId: string;
  orchestrationId: string;
}

export interface IAvailableInterview {
  interviewId: string;
  endpoint: string;
  interviewType: string;
  assessmentType: string;
  state: string;
}

export class AvailableInterviews extends Array<IAvailableInterview> {
  constructor(input: IAvailableInterview[]) {
      super();
      try {
          (input || []).forEach(item => {
              this.push(item);
          });
      } catch (ex) {

      }
  }
}

export enum InterviewEventType {
  Initialized,
  Finished,
  Next = 'next',
  Previous = 'prev',
  Postback = 'postback',
  Goto = 'goto',
  Forward = 'forward',
  Evaluation = 'evaluation',
  Finish = 'finish',
}

export enum InterviewType {
  Community = 'Community',
  Medicaid = 'Medicaid',
  LIS = 'LIS',
  SNAP = 'SNAP',
  Veteran = 'VA',
  RPC = 'RPC',
  Custom = 'Custom'
}

export enum AssessmentType {
  Eligibility = 'Eligibility',
  Enrollment = 'Enrollment'
}

export enum ResponseType {
  Primary = 'Primary',
  Secondary = 'Secondary'
}

export enum EntityType {
  Case = 'Case',
  Orchestration = 'Orchestration',
  Telephony = 'Telephony'
}

export interface IInterviewEvent {
  type: InterviewEventType;
  interviewManager: InterviewManager;
  payload?: any;
}

export class InterviewContext {

  evaluatingInputFlag: boolean;
  evaluationResultFlags: EvaluationResultFlags = new EvaluationResultFlags();
  lastEvaluationModel: IEvaluationRequest;
  interviewContextFunc: () => any;
  customContextData: any;
  initialized: boolean;
  interviewParameters: InterviewGlobalMetadata;


  evaluationResponseError: any;

  form: FormGroup = new FormGroup({});

  variables: IVariableEvaluationModel[] = [];

  evaluationSeverityMode: EvaluationSeverityMode;



  get isPrimaryInterview() {
      return this.interviewParameters.mode === ResponseType.Primary;
  }

  get isSecondaryInterview() {
      return this.interviewParameters.mode === ResponseType.Secondary;
  }

  constructor(metadata: InterviewGlobalMetadata) {
      this.interviewParameters = metadata;
  }
}

export class InterviewContextEvents {

  lifeCycleEvent$ = new Subject<IInterviewEvent>();

  onValueChanged$ = new Subject<BaseHandler>();

  onTemplateValueChanged$: Subscription;

  displayFinishDialog$ = new EventEmitter<boolean>();

  evaluationResult$ = new BehaviorSubject<IEvaluationResult>(null);

  private _evaluationSeverity$ = new BehaviorSubject<EvaluationSeverityMode>(EvaluationSeverityMode.Lineant);
  evaluationSeverity$ = this._evaluationSeverity$.asObservable();

  // showInterviewProperties$ = new BehaviorSubject<boolean>(null);

  forceFinish$ = new EventEmitter<any>();

  completionProcess$ = new BehaviorSubject<CompletionProcess>(null);


  constructor(private interviewManager: InterviewManager) {
      setTimeout(async () => {
          await this.initializeEvaluationSeverityMode();
      });
  }

  setSeverity(evaluationSeverity: EvaluationSeverityMode) {
      this._evaluationSeverity$.next(evaluationSeverity);
  }

  getSeveritySync() {
      return this._evaluationSeverity$.value;
  }

  async initializeEvaluationSeverityMode() {
      // const userRole = await this.interviewManager.userService.currentRole$.pipe(first()).toPromise();
      // const evaluationServerity = (userRole.inRole(RoleList.QualityAssurance)) ? EvaluationSeverityMode.Strict : EvaluationSeverityMode.Lineant;
      // if (this.interviewManager.interviewContext && this.interviewManager.interviewContext.interviewParameters.productCase) {
      //     const productCase = this.interviewManager.interviewContext.interviewParameters.productCase;
      //     // if (userRole.inRole(RoleList.Advocate) && !InterviewInProgressStages.find(stageItem => stageItem === productCase.currentStage)) {
      //     //     evaluationServerity = EvaluationSeverityMode.Lineant;
      //     // }
      // }
      const evaluationServerity = EvaluationSeverityMode.Strict;
      this.setSeverity(evaluationServerity);
  }

  setOnValueChanged(callback: (handler: BaseHandler) => void) {
      this.onTemplateValueChanged$ = this.interviewManager.templateService.onValueChanged.subscribe(callback);
  }

  clear() {
      this.evaluationResult$.next(null);
      // this.showInterviewProperties$.next(null);
      this.completionProcess$.next(null);

      if (!!this.onTemplateValueChanged$ && !this.onTemplateValueChanged$.closed) {
          this.onTemplateValueChanged$.unsubscribe();
      }
      this.onTemplateValueChanged$ = null;
  }
}



export class EvaluationResultFlags {
  isCompleted?: boolean;
  haveEvaluationForAllInterviews?: boolean;
  canShowErrors?: boolean;
  handlingInterviewFinishing?: boolean;
  get readyToFinish(): boolean {
      return this.isCompleted && !this.handlingInterviewFinishing;
  }
}

export interface IInterviewInitializer {
  startInterview: (globalParameters?: any) => Promise<any>;
  onInterviewLoadData$: Observable<IInterviewLoadModel>;
}

export interface IInterviewLoadModel {
  parentOrchestrationId: number;
  parentOrchestrationExternalId: string;
  orchestrationId: number;
  orchestrationExternalId: string;
}

export type ExecutionMode = 'Test' | 'RequestStructure';

export interface InterviewGlobalMetadata {
  categoriesFunc?: () => Observable<any[]>;
  extraCompletionProcess?: boolean;
  executionMode?: ExecutionMode;
  mode: ResponseType;

  interview?: IAvailableInterview;


  entityType: EntityType;
  entityId?: string;
  tenantId?: string;

  productCase?: CaseModel;


  pageSize: number;
  hideProducts?: boolean;
  hideOptions?: boolean;
  hideFinishButton?: boolean;
  finishButtonLabel?: string;

  hideNavigation?: boolean;
  hideCategories?: boolean;
  showInterviewMetadata?: boolean;
  interviewContextFunc?: () => void;
  evaluationSeveryMode?: EvaluationSeverityMode;


}

export interface EvaluationResultPage {
  categoryName: string;
  pageNumber: number;
  isCurrent: boolean;
  validationErrors: EvaluationError[];
  disqualificationReasons: any[];
}

export interface EvaluationError {
  message: string;
  code: string;
  attemptedValue: any;
  propertyName: string;
  resourceName: string;
  severity: number;
}

export class TypedQualificationReason {
  type: string;
  displayName: string;
  disqualifications: IDisqualificationReason[];
  status: string;

  static qualificationBundle(bundle: TypedQualificationReason[]) {
      return bundle.reduce((prev, current) => [...prev, ...current.disqualifications], []);
  }
}

export interface InterviewMetadataItem {
  key: string;
  displayName: string;
  value: any;
  description: string;
  category: string;
}

export class EvaluationResult implements IEvaluationResult {
  pages: EvaluationResultPage[];
  categories: ICategoryResult[];
  variables: IVariable[];
  currentPage: ICurrentPage;
  interviews: IInterviewResult[];
  interviewStack: string[][];

  metadata: InterviewMetadataItem[];
  hasEvaluationSources = false;

  constructor(input: IEvaluationResult, interviewManager: InterviewManager) {
      const internalInput = input || {} as IEvaluationResult;
      this.pages = (internalInput.pages || []);
      this.interviews = (internalInput.interviews || []).map(interview => ({
          name: interview.name,
          displayName: interview.displayName,
          evaluationStatus: interview.evaluationStatus,
          completion: interview.completion,
          hasEvaluationErrors: interview.hasEvaluationErrors,
          variables: interview.variables,
          disqualificationReasons: interview.disqualificationReasons,
          // typedDisqualificationReasons: interview.typedDisqualificationReasons
          qualificationResultItems: EvaluationResult.sortDisqualificationResons(interview.qualificationResultItems)
      } as IInterviewResult));

      this.variables = (internalInput.variables || []).map(variableItem => new Variable(variableItem, interviewManager));
      this.categories = (internalInput.categories || []).map(categoryItem => new CategoryResult(categoryItem, interviewManager));
      // debugger;
      this.currentPage = new CurrentPage((internalInput.currentPage || {} as ICurrentPage), interviewManager);
      this.interviewStack = internalInput.interviewStack;

      this.metadata = internalInput.metadata;
      this.hasEvaluationSources = !!this.categories && this.categories && this.categories.some(cat => !!cat.evaluationSources && cat.evaluationSources.length > 0);
  }

  static sortDisqualificationResons(qualificationTypes: any): TypedQualificationReason[] {
      // const internal = (qualificationTypes || {}) as {[key: string]: IDisqualificationReason[]};

      // const result = Object.getOwnPropertyNames(internal).map(qualificationTypeName => ({typeName: qualificationTypeName, disqualifications: qualificationTypes[qualificationTypeName]}))
      const result = (qualificationTypes as any[]).sort((a, b) => a.disqualifications.length ? 1 : 0);

      return result;
  }

  get hasError() {
      return this.pages.some(page => page.validationErrors && page.validationErrors.length > 0); // .interviews.some(interview => interview. === 100 && this.currentPage.variables.some(variable => variable.validationErrors != null && variable.validationErrors.length > 0)); // interview.variables.map(ref => this.variables.find(variable => variable.name === ref.name)).some(variable => variable.validationErrors != null && variable.validationErrors.length > 0));
  }
}

export interface ICurrentPage {
  categoryName: string;
  displayName: string;
  index: number;
  pageSize: number;
  variables: IVariable[];
  hasError: boolean;
  isLastPage: boolean;
}

export class CurrentPage implements ICurrentPage {
  categoryName: string;
  displayName: string;
  index: number;
  pageSize: number;
  variables: IVariable[];
  isLastPage: boolean;
  get hasError() {
      return this.variables.some(variable => variable.validationErrors && variable.validationErrors.length > 0);
  }

  constructor(input: ICurrentPage, interviewManager: InterviewManager) {
      this.categoryName = input.categoryName;
      this.displayName = input.displayName;
      this.index = input.index;
      this.pageSize = input.pageSize;
      this.isLastPage = input.isLastPage;

      this.variables = (input.variables || []).map(variableItem => new Variable(variableItem, interviewManager));
  }
}

export interface IInterviewResult {
  name: string;
  displayName: string;
  evaluationStatus: string;
  completion: number;
  hasEvaluationErrors: boolean;
  variables: IVariableReference[];
  disqualificationReasons: IDisqualificationReason[];
  qualificationResultItems?: TypedQualificationReason[];
  evaluationSeverityMode: EvaluationSeverityMode;
}

export interface IDisqualificationReason {
  sourceName: string;
  sourceType: string;
  sourceDisplayName: string;
  severity: string;
  message: string;
  resultCode: string;
  type: string;
  metadata: string;
}

export interface ICategoryResult {
  displayName: string;
  name: string;
  pages: IPageResult[];
  variables: IVariable[];
  firstPageIndex: number;
  hasValidationErrors: boolean;
  evaluationSources: IVariableEvaluationSource[];
}

export interface IVariableEvaluationSource {
  name: string;
  value: string;
  description: string;
}

export interface IPageResult {
  pageNumber: number;
  categoryIndex: number;
}

export interface IVariableReference {
  name: string;
}

export interface ICategoryPage {
  categoryIndex: number;
  pageNumber: number;
}

export class CategoryResult implements ICategoryResult {
  firstPageIndex: number;
  displayName: string;
  name: string;
  pages: IPageResult[];
  variables: IVariable[];
  hasValidationErrors: boolean;
  evaluationSources: IVariableEvaluationSource[];



  constructor(input: ICategoryResult, interviewManager: InterviewManager) {
      this.name = input.name;
      this.displayName = input.displayName;
      this.firstPageIndex = input.firstPageIndex;
      this.hasValidationErrors = input.hasValidationErrors;
      this.evaluationSources = input.evaluationSources;

      // debugger;
      this.pages = (input.pages || []).map(pageItem => (pageItem as ICategoryPage));
      this.variables = (input.variables || []).map(variableItem => new Variable(variableItem, interviewManager));
  }
}

export interface IVariable {
  name: string;
  description: string;
  script: string;
  forcePostback: boolean;

  value?: any;
  display: boolean;
  isHidden: boolean;
  dependOn: string[];
  dependencies: string[];
  validationErrors?: IErrorData[];
  disqualificationReasons: any[];
  order: number;
  displayName: string;
  categoryName: string;

  type?: string;
  hasValue?: string;
  displayMetadata: IDisplayMetadata;
  width: string;
  scriptFormatted: string;
  displayNameFormatted: string;
  descriptionFormatted: string;
  hasDependencies: boolean;
  staticLabel: boolean;
  pageNumber: number;
}

export class Variable implements IVariable {
  name: string;
  description: string;
  script: string;
  forcePostback: boolean;
  value?: any;
  display: boolean;
  isHidden: boolean;
  dependOn: string[];
  dependencies: string[];
  validationErrors?: IErrorData[];
  disqualificationReasons: any[];
  order: number;
  displayName: string;
  categoryName: string;
  type?: string;
  hasValue?: string;
  displayMetadata: IDisplayMetadata;
  width: string;
  scriptFormatted: string;
  displayNameFormatted: string;
  descriptionFormatted: string;
  staticLabel: boolean;
  pageNumber: number;

  get hasDependencies() {
      return this.dependencies && this.dependencies.length > 0;
  }

  constructor(variable: IVariable, interviewManager: InterviewManager) {
      this.name = variable.name;
      this.description = variable.description;
      this.script = variable.script;
      this.forcePostback = variable.forcePostback;
      this.value = variable.value;
      this.display = variable.display;
      this.isHidden = variable.isHidden;
      this.dependOn = variable.dependOn;
      this.dependencies = variable.dependencies;
      this.validationErrors = variable.validationErrors;
      this.disqualificationReasons = variable.disqualificationReasons;
      this.order = variable.order;
      this.displayName = variable.displayName;
      this.scriptFormatted = interviewManager.variableTemplatingService.process(this.script);
      // debugger;
      this.displayNameFormatted = interviewManager.variableTemplatingService.process(this.displayName);
      this.descriptionFormatted = interviewManager.variableTemplatingService.process(this.description);
      this.categoryName = variable.categoryName;
      this.type = variable.categoryName;
      this.hasValue = variable.hasValue;
      // debugger;
      this.displayMetadata = variable.displayMetadata ? new DisplayMetadata(variable.displayMetadata, interviewManager) : null;

      if (this.displayMetadata) {
          this.displayMetadata.handler = interviewManager.templateFactoryService.buildTemplate(this, interviewManager);
          this.displayMetadata.handler.variable = this;
      }

      this.width = variable.width;
      this.staticLabel = ['buttongroup', 'boolean', 'nullableboolean'].some(template => template === (this.displayMetadata && this.displayMetadata.template));
      // debugger;
      this.pageNumber = variable.pageNumber;
  }
}

export interface IErrorData {
  message: string;
  code: string;
  attemptedValue: any;
  propertyName: string;
  resourceName: string;
  severity: string;
}

export interface IFieldMetadata {
  order: number;
  type: string;
  template: string;
  templateData: any;
  displayName: string;
  propertyName: string;
}


export interface IVariableEvaluationModel {
  name: string;
  value?: any;
}

export interface IEvaluationResult {
  pages: any[];
  categories: ICategoryResult[];
  variables: IVariable[];
  currentPage: ICurrentPage;
  interviews: IInterviewResult[];
  interviewStack: string[][];
  hasError: boolean;
  metadata: InterviewMetadataItem[];
  hasEvaluationSources: boolean;
}

export interface IEvaluationRequest {
  interview: IAvailableInterview;
  entityId?: string;
  member?: Member;
  primaryAddress?: Address;
  variables?: IVariableEvaluationModel[];
  assessmentType?: AssessmentType;
  pagingInfo?: PagingInfo;
  force?: boolean;
  initialize: boolean;
  executionMode: ExecutionMode;
  mode?: ResponseType;
  evaluationSeveryMode?: EvaluationSeverityMode;
}

export interface PagingInfo {
  pageIndex?: number;
  pageSize?: number;
  action?: InterviewEventType;
}

export interface InitializationRequest {
  entityId: string;
  entityType: string;
  assessmentType: string;
  mode: string;
}

export interface IFinalizeInterviewRequest {
  tenantId: string;
  memberId: string;
  evaluationResult: IEvaluationResult;
  entityId?: string;
  entityType?: EntityType;
  interview: IAvailableInterview;
}


export interface IDocumentRequest {
  interview: IAvailableInterview;
  entityId: string;
  entityType: string;
}


export interface BaseGridItem {
  _id: string;
}

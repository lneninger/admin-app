import { IInterviewEvaluatePageInfo, InterviewEvaluationAction } from 'functions/src/_services/interviews/interview.models';

export interface IInterviewActionPayload{
  id: string;
  action: InterviewEvaluationAction;
  pageInfo?: IInterviewEvaluatePageInfo;
  value?: any;
}

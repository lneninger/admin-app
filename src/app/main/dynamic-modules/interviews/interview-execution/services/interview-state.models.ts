import { IInterviewDefinition } from '../models/interview-definition';
import { IInterviewInstance } from '../models/interview-instance';

export interface IInterviewStateModel{
  interviewDefinitions: IInterviewDefinition[];
  interviewInstances: IInterviewInstance[];
}

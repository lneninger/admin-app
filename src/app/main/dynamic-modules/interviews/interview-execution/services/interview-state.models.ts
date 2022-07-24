import { IPersistedInterviewStatus } from '../../../../../../../functions/src/_services/interviews/models/interview-evaluation-response';
import { IInterviewDefinition } from '../models/interview-definition';
import { IInterviewInstance } from '../models/interview-instance';

export interface IInterviewStateModel{
  interviewDefinitions: IInterviewDefinition[];
  interviewInstances: IPersistedInterviewStatus[];
}

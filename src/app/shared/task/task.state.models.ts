import { CommandLifeCycleEvent, ICommand, ICommandHost } from './command/command.models';




export interface ITaskWrapper {
    task: TaskInfo
}

export declare type ITaskCommandWrapper = ICommand & ITaskWrapper
export interface TaskInfo {
    id: string;
    name?: string;
    displayName?: string;
    description?: string;
    icon: string;
    commandId?: string,
    condition?: string,
    order?: number;
    // status?: TaskStatus;
    rawPayload?: any;
    executionTime?: TaskExecutionTime,
    metadata?: { [key: string]: any },
    isAsync?: boolean;
    allowReset: boolean;
    executionData: TaskInfoExecutionData;
    notification: TaskNotification;
}

export interface TaskNotification {
    level: string,
    header: string;
    icon: string;
    details: string,
    dismissible: boolean
    sourceCommand: ITaskCommandWrapper;
}

export interface TaskInfoExecutionData {

    status: TaskInfoStatus;
    previousStatus: TaskInfoStatus;
    evaluation: TaskInfoRunnableEvaluation;
    previousEvaluation: TaskInfoRunnableEvaluation;
    executionOrder: number;
    dismissedNotification: boolean;
}

export interface TaskInfoStatus {
    value: CommandLifeCycleEvent;
    date: Date;
}
export interface TaskInfoRunnableEvaluation {
    value: boolean;
    date: Date;
}

export declare type TaskExecutionTime = undefined | 'Start' | 'End';



export interface IMemberGuardAnswers {
    reason: MemberGuardAnswersReason;
}

export declare type MemberGuardAnswersReason = 'OnCall' | 'Management';
export interface ITaskHost extends ICommandHost {
    // readonly executingTaskCommandSync: ICommand;
    // cancelTask(command: ICommand): Promise<void>;
    // markTaskAsCompleted(cmd: ICommand);


    // refreshTasks(): Promise<ICommand[]>;
    // hostResetTaskCommands(taskCommands: ICommand[]);
}

export interface ITaskAdapter {
    closeTask(task: string);

}





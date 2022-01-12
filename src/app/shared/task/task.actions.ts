import { ITaskHost } from './task.state.models';

export class RunTaskAction{
    static readonly type = '[TaskRunner] Run Task';
    constructor(public readonly name: string, public readonly payload?: any){}
}

export class RunRegisteredRunnerTasks{
    static readonly type = '[TaskRunner] Run Tasks';
    constructor(public readonly context: ITaskHost){}
}

export class TaskExecutedAction{
    static readonly type = '[TaskRunner] Task Executed';
    constructor(public readonly name: string){}
}

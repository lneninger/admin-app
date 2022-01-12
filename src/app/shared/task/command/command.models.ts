import { Observable } from 'rxjs';

export interface ICommandsWrapper {
    commands: ICommand[];
}

export interface ICommandService {
    executingCommandParse: any;
    readonly commandsSync: ICommand[];

    runCommands(refreshCommands: boolean);
    markCommandAsExecuting(cmd: ICommand, commandParse: any);
    markCommandAsCompleted(cmd: ICommand);
    markCommandAsCanceled(cmd?: ICommand);
}

export interface ICommandContext {
    host: ICommandHost;
    command?: ICommand;
    runAsTask?: boolean;
    commandService?: ICommandService
}

export interface ICommandHost {

    readonly commandsSync: ICommand[];
    readonly commands$: Observable<ICommand[]>;
    readonly commandHostReady$: Observable<boolean>;

    readonly trackingCommandsSync: ICommand[];
    readonly trackingCommands$: Observable<ICommand[]>;
    executingCommandParse: any;
    // commandEvent$: EventEmitter<ICommandLifeCycle>;
    // upsertCommand(cmd: ICommand, payload?: any): Promise<any>;
    // setTaskStatus(originalCommand: ICommand, status: CommandLifeCycleEvent);

    retrieveCommands(): Promise<ICommand[]>;
    setCommands(commands: ICommand[]): void;


    updateTrackingCommand(cmd: ICommand);
    setTrackingCommands(commands: ICommand[]);
}

export interface ICommand {
    id?: string;
    command?: string,
}

export interface ICommandLifeCycle {
    event: CommandLifeCycleEvent,
    command: ICommand,
}




export enum CommandLifeCycleEvent {
    New = 'New',
    Pending = 'Pending',
    Executing = 'Executing',
    Completed = 'Completed',
    Canceled = 'Canceled',
    Disabled = 'Disabled'
}


export const CloseSessionCommand = {
    "id": "member-close-session",
    "command": "close session",
    "task": {
        "commandId": "member-close-session",
        "condition": "system.member.oncall === false",
        "description": "Conduct survey for quality purpose",
        "displayName": "Close Session",
        "executionTime": "End",
        "id": "member-task-session-survey",
        "metadata": "1",
        "order": 99999 ,
    }
}

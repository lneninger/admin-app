import { Payload } from '@angular-ru/ngxs/decorators';
import { NgxsDataRepository } from '@angular-ru/ngxs/repositories';
import { EventEmitter, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { combineLatest, firstValueFrom, from, Subject } from 'rxjs';
import { filter, first, map, switchMap, tap } from 'rxjs/operators';
import { Utilities } from 'src/app/main/services/utilities';

import {
  CommandLifeCycleEvent,
  ICommand,
  ICommandContext,
  ICommandLifeCycle,
  ICommandService,
  ICommandsWrapper,
} from './command/command.models';
import { CommandService } from './command/command.service';
import { SystemEvaluatorService } from './system-evaluator/system-evaluator.service';
import {
  ITaskCommandWrapper,
  ITaskHost,
  ITaskWrapper,
  TaskExecutionTime,
  TaskInfoExecutionData,
  TaskInfoRunnableEvaluation,
  TaskNotification,
} from './task.state.models';


export class TaskService extends NgxsDataRepository<ICommandsWrapper> implements ICommandService {

  private _taskHost: ITaskHost;
  notifications$ = new Subject<TaskNotification[]>();

  set executingCommandParse(value: any) {
    this._taskHost.executingCommandParse = value;
  }

  get executingCommandParse() {
    return this._taskHost.executingCommandParse;
  }
  commandEvent$ = new EventEmitter<ICommandLifeCycle>();
  taskProcessDate: Date;

  get commandsSync() {
    return this._taskHost.trackingCommandsSync.map(_ => _ as ITaskCommandWrapper);
  }

  get commands$() {
    return this._taskHost.trackingCommands$.pipe(map(commands => commands.map(_ => _ as ITaskCommandWrapper)));
  }

  get taskCommands$() {
    return this.commands$.pipe(map(commands => commands && commands.filter(cmd => cmd.task)));
  }

  get taskCommandsSync() {
    return this.commandsSync.filter(cmd => cmd.task);
  }

  get completedTaskCommandsSync() {
    return this.taskCommandsSync.filter(_ => _.task.executionData.status.value === CommandLifeCycleEvent.Completed);
  }

  get completedTaskCommands$() {
    return this.taskCommands$.pipe(map(commands => commands.filter(_ => _.task.executionData.status.value === CommandLifeCycleEvent.Completed)));
  }

  get pendingTaskCommandsSync() {
    return this.taskCommandsSync.filter(cmd => [CommandLifeCycleEvent.Completed, CommandLifeCycleEvent.Disabled].every(statusItem => cmd.task.executionData.status.value !== statusItem));
  }

  get pendingTaskCommands$() {
    return this.taskCommands$.pipe(map(commands => commands.filter(cmd => [CommandLifeCycleEvent.Completed, CommandLifeCycleEvent.Disabled].some(statusItem => cmd.task.executionData.status.value !== statusItem))));
  }

  get notCompletedTaskCommandsSync() {
    return this.taskCommandsSync.filter(cmd => cmd.task.executionData.status.value !== CommandLifeCycleEvent.Completed);
  }

  get executingTaskCommandSync() {
    return this.taskCommandsSync.find(cmd => cmd.task.executionData.status.value === CommandLifeCycleEvent.Executing);
  }

  get executableTaskCommandsSync(): ITaskCommandWrapper[] {
    return this.pendingTaskCommandsSync.filter(cmd => cmd.task.executionData.evaluation.value === true);
  }

  constructor(
    private systemEvaluatorService: SystemEvaluatorService,
    private commandService: CommandService,
    protected router: Router
  ) {
    super();
  }

  static orderTasks(taskedCmds: ITaskCommandWrapper[]): ITaskCommandWrapper[] {
    return [...taskedCmds].sort((a, b) => (a.task.order && b.task.order) || a.task.order > b.task.order ? 1 : -1);
  }

  //#region Core Functions

  setContext(context: ITaskHost) {
    this._taskHost = context;
    return this;
  }

  async activate() {
    await this.cleanExecution();
    combineLatest([this._taskHost.commandHostReady$, this.commandEvent$]).pipe(filter(([ready, event]) => ready && (event.command as ITaskCommandWrapper).task && event.event === CommandLifeCycleEvent.Completed), switchMap((_) => {
      return from(this._taskHost.retrieveCommands());
    }), tap(_ => {
      this.taskProcessDate = new Date();
    }), map(commands => {
      return commands as ITaskCommandWrapper[];
    })).subscribe(async _ => {
      const commands = this.mergeCommands(_);
      await this.updateCommands(commands);

      await this.runCommands();
    });

    this._taskHost.commandHostReady$.pipe(filter(ready => ready), switchMap(_ => {
      return this._taskHost.commands$.pipe(filter(commands => commands && commands.length > 0), first(), tap(commands => {
        this.taskProcessDate = new Date();
      }), map(commands => {
        return commands as ITaskCommandWrapper[];
      }));
    })).subscribe(async (commands) => {
      const newCommands = this.mergeCommands(commands);
      await this.updateCommands(newCommands);

      await this.runCommands();
    });

  }

  async runCommands(refreshCommands = false) {
    if (refreshCommands) {
      const commands = this.mergeCommands(this.commandsSync);
      await this.updateCommands(commands);
    }

    if (!this.executingTaskCommandSync && this.executableTaskCommandsSync.length > 0) {
      const executables = TaskService.orderTasks(this.executableTaskCommandsSync);
      const taskCmd = executables[0];
      if (!taskCmd.task.executionData.executionOrder) {
        taskCmd.task.executionData.executionOrder = this.taskCommandsSync.map(_ => _.task.executionData.executionOrder).reduce((prev, curr) => curr > prev ? curr : prev) || 1;
      }
      this.setCommandStatus(taskCmd, CommandLifeCycleEvent.Executing);
      await this.runTask(taskCmd);
    }
  }

  async runTask(taskCmd: ITaskCommandWrapper) {
    await this.commandService.runCommand(taskCmd, { host: this._taskHost, commandService: this, runAsTask: true } as ICommandContext);
  }




  /**
   * Merge commands based on task status
   * C: Command  |  T: Task  |  TP: Task and Pending   |  TC: Task and Completed  |  TD: Task and Disabled
   *
   *
   *  UI                DB              New UI
   *  _       ---->      _      ---->     _
   *  _       ---->      C      ---->     C
   *  _       ---->      C T    ---->     C TN
   *  C       ---->      _      ---->     _
   *  C       ---->      C      ---->     C
   *  C       ---->      C T    ---->     C TN
   *  C TP    ---->      C      ---->     C TP -> TD
   *  C TP    ---->      C T    ---->     C TP
   *  C TC    ---->      C      ---->     C TC
   *  C TC    ---->      C T    ---->     C TC
   *  C TD    ---->      C      ---->     C TD
   *  C TD    ---->      C T    ---->     C TD -> TN
   */

  private mergeCommands(newCommands: ITaskCommandWrapper[]) {
    const result = [...Utilities.cloneHard(newCommands)];
    for (const newCommand of result) {
      const currentCommand = this.commandsSync.find(currentItem => currentItem.id === newCommand.id) as ITaskWrapper;
      // only enter if one of the commands has task
      if (newCommand.task) {
        this.newTaskCommandMerge(currentCommand, newCommand);
      } else if (currentCommand && currentCommand.task) {
        newCommand.task = currentCommand.task;
        if (![CommandLifeCycleEvent.Completed, CommandLifeCycleEvent.Disabled].some(status => currentCommand.task.executionData.status.value === status)) {
          newCommand.task.executionData.previousStatus = newCommand.task.executionData.status;
          newCommand.task.executionData.status = this.createNewExecutionData().status;
          newCommand.task.executionData.status.value = CommandLifeCycleEvent.Disabled;
        }
      }
    }

    this.evaluatePendingTasks(result);

    this.refreshNotifications(result);

    return result;
  }

  private newTaskCommandMerge(currentCommand: ITaskWrapper, newCommand: ITaskCommandWrapper) {
    if (currentCommand && currentCommand.task) {
      newCommand.task.executionData = currentCommand.task.executionData;
      if (currentCommand.task.executionData.status.value === CommandLifeCycleEvent.Disabled) {
        newCommand.task.executionData.previousStatus = newCommand.task.executionData.status;
        newCommand.task.executionData.status = this.createNewExecutionData().status;
      }
    } else {
      newCommand.task.executionData = this.createNewExecutionData();
    }
  }

  private createNewExecutionData(): TaskInfoExecutionData {
    return {
      status: {
        value: CommandLifeCycleEvent.New,
        date: this.taskProcessDate
      },
      evaluation: null,
      previousEvaluation: null,

    } as TaskInfoExecutionData;
  }

  private evaluatePendingTasks(commands: ITaskCommandWrapper[]) {
    for (const command of commands) {
      if (command.task && !this.markedAsCompleted(command)) {
        command.task.executionData = (command.task.executionData || this.createNewExecutionData());
        command.task.executionData.previousEvaluation = command.task.executionData.evaluation;
        command.task.executionData.evaluation = {
          value: this.systemEvaluatorService.evaluate(command.task.condition),
          date: new Date()
        } as TaskInfoRunnableEvaluation;
      }
    }

  }

  private refreshNotifications(commands?: ITaskCommandWrapper[]) {
    commands = commands || this.commandsSync;
    const newTasks = commands.filter(taskCmd => {
      return taskCmd.task && taskCmd.task.notification && taskCmd.task.executionData.status.value !== CommandLifeCycleEvent.Completed && !taskCmd.task.executionData.dismissedNotification && taskCmd.task.executionData.evaluation.value === true;
    });

    const notifications = newTasks.map(item => ({
      level: item.task.notification.level,
      header: item.task.displayName,
      icon: item.task.icon,
      details: item.task.notification.details,
      dismissible: item.task.notification.dismissible,
      sourceCommand: item
    } as TaskNotification));

    this.notifications$.next(notifications);
  }

  async markCommandAsCanceled(command?: ITaskCommandWrapper) {
    command = command || this.executingTaskCommandSync;
    await this.cancelCommand(command);

    const executionTime: TaskExecutionTime = command.task.executionTime || 'Start';
    if (executionTime === 'Start') {
      // send user to member search
      if (!this.systemEvaluatorService.member.oncall || !this.systemEvaluatorService.screener.rpccompleted) {
        await this.router.navigate(['/search']);
      }
    } else if (executionTime === 'End') {
      const toReset = this.taskCommandsSync.filter(commandItem => commandItem.task.executionTime === 'End' && commandItem.task.allowReset);
      toReset.forEach(toResetItem => {
        this.setCommandStatus(toResetItem, null);
      });
    }
  }

  async markCommandAsExecuting(cmd: ITaskCommandWrapper, commandParse: any) {
    this.executingCommandParse = commandParse;
    await this.setCommandStatus(cmd, CommandLifeCycleEvent.Executing);
    this.commandEvent$.next({ event: CommandLifeCycleEvent.Executing, command: cmd } as ICommandLifeCycle);
  }

  async markCommandAsCompleted(cmd: ITaskCommandWrapper) {
    this.executingCommandParse = undefined;
    await this.setCommandStatus(cmd, CommandLifeCycleEvent.Completed);
    setTimeout(() => {
      this.commandEvent$.next({ event: CommandLifeCycleEvent.Completed, command: cmd } as ICommandLifeCycle);
    }, 0);
  }

  protected async cancelCommand(cmd: ITaskCommandWrapper) {
    this.executingCommandParse = undefined;
    await this.setCommandStatus(cmd, CommandLifeCycleEvent.Canceled);
  }

  protected async setCommandStatus(cmd: ITaskCommandWrapper, status: CommandLifeCycleEvent) {
    cmd = Utilities.cloneHard(cmd);
    cmd.task.executionData.previousStatus = cmd.task.executionData.status;
    cmd.task.executionData.status = {
      value: status,
      date: new Date()
    };
    await this.upsertCommand(cmd);
  }

  async upsertCommand(@Payload('action') cmd: ITaskCommandWrapper) {
    await this._taskHost.updateTrackingCommand(cmd);
  }

  private async updateCommands(@Payload('commands') commands: ITaskCommandWrapper[]) {
    await this._taskHost.setTrackingCommands(commands);
  }

  private async cleanExecution() {
    if (this.executingTaskCommandSync) {
      await this.setCommandStatus(this.executingTaskCommandSync, this.executingTaskCommandSync.task.executionData.previousStatus.value);
    }
  }

  //#endregion

  //#region Utils
  markedAsCompleted(taskName: string | (ICommand & ITaskWrapper)) {
    const command: ICommand & ITaskWrapper = this.getTask(taskName);

    if (command && command.task) {
      return (command.task.executionData.status.value === CommandLifeCycleEvent.Completed);
    } else {
      console.log(`Task ${taskName} is not registered yet`);
    }
  }

  markedAsExecuting(taskName: string | (ICommand & ITaskWrapper)) {
    const command: ICommand & ITaskWrapper = this.getTask(taskName);

    if (command && command.task) {
      return (command.task.executionData.status.value === 'Executing');
    } else {
      console.log(`Task ${taskName} is not registered yet`);
    }
  }

  private getTask(taskName: string | (ICommand & ITaskWrapper)) {
    let command: ICommand & ITaskWrapper;
    if (typeof taskName === 'string') {
      const formattedTaskName = taskName.toUpperCase();
      command = this.commandsSync.map(_ => _ as ICommand & ITaskWrapper).find(action => action.task && action.task.name.toUpperCase() === formattedTaskName);
    } else {
      command = taskName;
    }
    return command;
  }


  dismissNotification(command: ITaskCommandWrapper) {
    const newCommand = Utilities.cloneHard(command);
    newCommand.task.executionData.dismissedNotification = true;
    this._taskHost.updateTrackingCommand(newCommand);
    this.refreshNotifications();
  }

  //#endregion

}

@Injectable({
  providedIn: 'root'
})
export class TaskLifeCycleService {
  finishTask = new EventEmitter<any>();
}

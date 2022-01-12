import { TaskDialogComponent } from './../task-dialog/task-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { Injectable } from '@angular/core';
import { LazyLoadedWidgets } from 'src/app/app-routing-lazy';

import { ILazyLoadContext } from 'src/app/shared/lazy-loader/lazy-loader.models';

import { ITaskWrapper } from '../task.state.models';
import { ICommand, ICommandContext, ICommandService } from './command.models';
import { LabelValueLowerGeneric } from '../../general.models';

@Injectable({
  providedIn: 'root'
})
export class CommandParserService {

  constructor(private dialog: MatDialog) {

  }

  parse(command: string, customMetadata?: ICommandContext): any {
    const commandElements = this.splitCommand(command);
    let result: any;
    if (commandElements.length >= 2) {
      const action = commandElements[0];
      switch (action.label.toUpperCase()) {
        case 'OPEN':
          result = this.parseOpen(commandElements.slice(1), customMetadata);
          break;
        case 'RUN':
          result = this.parseRun(commandElements.slice(1), customMetadata);
          break;
        default:
          result = this.parseOpen(commandElements.slice(1), customMetadata);

      }
    }

    return result;
  }

  split(command: string) {
    const myRegexp = /[^\s"]+|"([^"]*)"/gi;
    const result: string[] = [];

    let match: RegExpExecArray;
    do {
      // Each call to exec returns the next regex match as an array
      match = myRegexp.exec(command);

      if (match != null) {
        // Index 1 in the array is the captured group if it exists
        // Index 0 is the matched text, which we use if no captured group exists
        result.push(match[1] ? match[1] : match[0]);
      }
    } while (match != null);

    return result;
  }

  splitCommand(command: string) {
    const commandElements = this.split(command).map(element => element.trim()).filter(element => element.length > 0);
    const keyValues: LabelValueLowerGeneric<ICommandElementData>[] = [];
    let previousElement: string;
    for (const element of commandElements) {
      if (element.startsWith('-') || !previousElement || !previousElement.startsWith('-')) {
        keyValues.push({ label: element, value: { values: [] } as ICommandElementData });
        previousElement = element;
      } else if (previousElement && previousElement.startsWith('-')) {
        keyValues[keyValues.length - 1].value.values.push(element);
      }
    }

    return keyValues;
  }

  private parseOpen(openCommandElements: LabelValueLowerGeneric<ICommandElementData>[], commandContext: ICommandContext): any {
    const target = openCommandElements[0].label.toUpperCase();
    let commandParse: any;
    switch (target) {
      case 'SURVEY':

        this.dialog.open(TaskDialogComponent, {
          data: {
            ...commandContext,
            displayName: this.getCommandParameterValue(openCommandElements, ['-TITLE', '--T']),
            description: this.getCommandParameterValue(openCommandElements, ['-SUBTITLE', '--SUBT']),
            icon: this.getCommandParameterValue(openCommandElements, ['-ICON', '--ICO']),
            customView: LazyLoadedWidgets.TASK_SURVEY,
          }
        });
      // commandParse = {
      //     customView: LazyLoadedWidgets.MEMBER_TASK_DIALOG,
      //     customViewMetadata: {
      //         ...commandContext,
      //         displayName: this.getCommandParameterValue(openCommandElements, ['-TITLE', '--T']),
      //         description: this.getCommandParameterValue(openCommandElements, ['-SUBTITLE', '--SUBT']),
      //         icon: this.getCommandParameterValue(openCommandElements, ['-ICON', '--ICO']),
      //         customView: LazyLoadedWidgets.TASK_MEMBER_SURVEY,
      //         customViewMetadata: {


      //         } as ITaskInterviewMetadata
      //     } as ITaskDialogMetadata<ITaskInterviewMetadata>
      // } as ILazyLoadContext<ITaskDialogMetadata<ITaskInterviewMetadata>>;

      // if (commandContext.runAsTask) {
      //     return this.updateHostExecutingTaskCommandAndUpdateTaskCommand(commandContext.commandService, commandParse, commandContext.command);
      // } else {
      //     return this.createWrapperFunction(commandContext, commandParse, [this.hostCommandFn]);
      // }
      // case 'MEMBER-GUARD':
      //   this.dialog.open(TaskDialogComponent, {
      //     data:{
      //       ...commandContext,
      //               displayName: this.getCommandParameterValue(openCommandElements, ['-TITLE', '--T']),
      //               description: this.getCommandParameterValue(openCommandElements, ['-SUBTITLE', '--SUBT']),
      //               icon: this.getCommandParameterValue(openCommandElements, ['-ICON', '--ICO']),
      //               customView: LazyLoadedWidgets.TASK_SURVEY,
      //     }
      //   })
      // commandParse = {
      //     customView: LazyLoadedWidgets.MEMBER_TASK_DIALOG,
      //     customViewMetadata: {
      //         ...commandContext,
      //         displayName: this.getCommandParameterValue(openCommandElements, ['-TITLE', '--T']),
      //         description: this.getCommandParameterValue(openCommandElements, ['-SUBTITLE', '--SUBT']),

      //         taskDisplayName: (commandContext.command as ITaskWrapper).task && (commandContext.command as ITaskWrapper).task.displayName,
      //         taskDescription: (commandContext.command as ITaskWrapper).task && (commandContext.command as ITaskWrapper).task.description,
      //         taskIcon: (commandContext.command as ITaskWrapper).task && (commandContext.command as ITaskWrapper).task.icon,

      //         icon: this.getCommandParameterValue(openCommandElements, ['-ICON', '--ICO']),
      //         customView: LazyLoadedWidgets.MEMBER_GUARD,
      //         customViewMetadata: {


      //         } as ITaskInterviewMetadata
      //     } as ITaskDialogMetadata<ITaskInterviewMetadata>
      // } as ILazyLoadContext<ITaskDialogMetadata<ITaskInterviewMetadata>>;

      // if (commandContext.runAsTask) {
      //     return this.updateHostExecutingTaskCommandAndUpdateTaskCommand(commandContext.commandService, commandParse, commandContext.command);
      // } else {
      //     return this.createWrapperFunction(commandContext, commandParse, [this.hostCommandFn]);
      // }

      // case 'MEMBER-RPC':

      //     commandParse = {
      //         customView: LazyLoadedWidgets.MEMBER_TASK_DIALOG,
      //         customViewMetadata: {
      //             ...commandContext,
      //             displayName: this.getCommandParameterValue(openCommandElements, ['-TITLE', '--T']),
      //             description: this.getCommandParameterValue(openCommandElements, ['-SUBTITLE', '--SUBT']),

      //             taskDisplayName: (commandContext.command as ITaskWrapper).task && (commandContext.command as ITaskWrapper).task.displayName,
      //             taskDescription: (commandContext.command as ITaskWrapper).task && (commandContext.command as ITaskWrapper).task.description,
      //             taskIcon: (commandContext.command as ITaskWrapper).task && (commandContext.command as ITaskWrapper).task.icon,

      //             icon: this.getCommandParameterValue(openCommandElements, ['-ICON', '--ICO']),
      //             customView: LazyLoadedWidgets.MEMBER_GUARD,
      //             customViewMetadata: {


      //             } as ITaskInterviewMetadata
      //         } as ITaskDialogMetadata<ITaskInterviewMetadata>
      //     } as ILazyLoadContext<ITaskDialogMetadata<ITaskInterviewMetadata>>;

      //     if (commandContext.runAsTask) {
      //         return this.updateHostExecutingTaskCommandAndUpdateTaskCommand(commandContext.commandService, commandParse, commandContext.command);
      //     } else {
      //         return this.createWrapperFunction(commandContext, commandParse, [this.activateCallAsCommandFn, this.runCommandsFn]);
      //     }

      default:

        this.dialog.open(TaskDialogComponent, {
          data: {
            ...commandContext,
            displayName: this.getCommandParameterValue(openCommandElements, ['-TITLE', '--T']),
            description: this.getCommandParameterValue(openCommandElements, ['-SUBTITLE', '--SUBT']),
            icon: this.getCommandParameterValue(openCommandElements, ['-ICON', '--ICO']),
            customView: LazyLoadedWidgets.TASK_SURVEY,
          }
        });
      // commandParse = {
      //     customView: LazyLoadedWidgets.MEMBER_TASK_DIALOG,
      //     customViewMetadata: {
      //         ...commandContext,
      //         displayName: this.getCommandParameterValue(openCommandElements, ['-TITLE', '--T']),
      //         description: this.getCommandParameterValue(openCommandElements, ['-SUBTITLE', '--SUBT']),
      //         icon: this.getCommandParameterValue(openCommandElements, ['-ICON', '--ICO']),
      //         customView: this.getCommandParameterValue(openCommandElements, ['-ADAPTER', '--ADAP']),
      //         customViewMetadata: {


      //         }
      //     } as ITaskDialogMetadata<any>
      // } as ILazyLoadContext<ITaskDialogMetadata<any>>;

      // if (commandContext.runAsTask) {
      //     return this.updateHostExecutingTaskCommandAndUpdateTaskCommand(commandContext.commandService, commandParse, commandContext.command);
      // } else {
      //     return this.createWrapperFunction(commandContext, commandParse, [this.hostCommandFn]);
      // }
    }
  }

  private parseRun(openCommandElements: LabelValueLowerGeneric<ICommandElementData>[], commandContext: ICommandContext): any {

    const target = openCommandElements[0].label.toUpperCase();
    let commandParse: any;
    // switch (target) {
    //   case 'CLOSE-SESSION':
    //     commandParse = {
    //       customView: LazyLoadedWidgets.MEMBER_TASK_CLOSE_SESSION,
    //       customViewMetadata: {
    //         ...commandContext,
    //       }
    //     };
    //     break;
    //   default:
    //     commandParse = {
    //       customView: LazyLoadedWidgets.MEMBER_TASK_DIALOG,

    //       customViewMetadata: {
    //         ...commandContext,
    //         displayName: this.getCommandParameterValue(openCommandElements, ['-TITLE', '--T']),
    //         description: this.getCommandParameterValue(openCommandElements, ['-SUBTITLE', '--SUBT']),

    //         taskDisplayName: (commandContext.command as ITaskWrapper).task && (commandContext.command as ITaskWrapper).task.displayName,
    //         taskDescription: (commandContext.command as ITaskWrapper).task && (commandContext.command as ITaskWrapper).task.description,
    //         taskIcon: (commandContext.command as ITaskWrapper).task && (commandContext.command as ITaskWrapper).task.icon,

    //         icon: this.getCommandParameterValue(openCommandElements, ['-ICON', '--ICO']),

    //         customView: this.getCommandParameterValue(openCommandElements, ['-ADAPTER', '--ADAP']) || LazyLoadedWidgets.TASK_INTERVIEW_COMPONENT,
    //         customViewMetadata: {
    //           package: this.getCommandParameterValue(openCommandElements, ['-PACKAGE', '--P']),
    //           version: this.getCommandParameterValue(openCommandElements, ['-VERSION', '--V']),
    //           dataProvider: this.getCommandParameterValue(openCommandElements, ['-DATA-PROVIDER', '--PROVIDER']),
    //           summaryComponent: this.getCommandParameterValue(openCommandElements, ['-SUMMARY-COMPONENT', '--SUMMARY']),
    //           contextData: this.getCommandParameterValue(openCommandElements, ['-CONTEXT-DATA:', '-DATA:', '--CONTEXT:'], { mode: 'prefix' }),

    //         } as ITaskInterviewMetadata
    //       } as ITaskDialogMetadata<ITaskInterviewMetadata>

    //     } as ILazyLoadContext<ITaskDialogMetadata<ITaskInterviewMetadata>>;

    //     break;
    // }
    if (commandContext.runAsTask) {
      return this.updateHostExecutingTaskCommandAndUpdateTaskCommand(commandContext.commandService, commandParse, commandContext.command);
    } else {
      return this.createWrapperFunction(commandContext, commandParse, [this.hostCommandFn]);
    }
  }

  getCommandParameterValue(openCommandElements: LabelValueLowerGeneric<ICommandElementData>[], matches: string[], options?: IInterviewParameterGetterOptions): string | any | undefined {
    options = options || {} as IInterviewParameterGetterOptions;

    const tempElements = openCommandElements.map(item => {
      const result = JSON.parse(JSON.stringify(item));
      const labelUpper = result.label.toUpperCase();
      let matchItem: string;
      if (options.mode === 'prefix') {
        matchItem = matches.find(match => labelUpper.startsWith(match));
      } else {
        matchItem = matches.find(match => match === labelUpper);
      }
      if (matchItem) {
        result.value.metadata = { match: matchItem };
      }

      return result;
    });

    const matchingElements = tempElements.filter(item => {
      return !!item.value.metadata && !!item.value.metadata.match;
    });

    if (options.mode === 'prefix') {
      const newMatchedElements = matchingElements.map(matchElement => ({ ...matchElement, label: matchElement.label.substring(matchElement.value.metadata.match.length) }));
      return newMatchedElements.reduce((map, obj) => {
        map[obj.label] = obj.value.values[0];
        return map;
      }, {});
    } else if (matchingElements.length === 1) {
      return matchingElements[0].value.values[0];
    } else if (matchingElements.length > 1) {
      throw new Error('interview version was declared more that once');
    }
  }



  async createWrapperFunction(commandContext: ICommandContext, commandParse: any, functions: ((commandService: ICommandContext, commandParse: any) => Promise<void>)[]) {
    return (async () => {
      functions.forEach(fn => {
        fn(commandContext, commandParse);
      })
    });
  }


  async hostCommandFn(commandContext: ICommandContext, commandParse: any) {
    commandContext.commandService.executingCommandParse = commandParse;
    await commandContext.commandService.markCommandAsExecuting(commandContext.command, commandParse);
  }

  async activateCallAsCommandFn(commandContext: ICommandContext, commandParse: any) {
    // const callManager = (commandContext.host as unknown as IMemberCallManager);
    // callManager.setOnCall(true);
  }

  async runCommandsFn(commandContext: ICommandContext, commandParse: any) {
    commandContext.commandService.runCommands(true);
  }


  async updateHostExecutingCommand(commandContext: ICommandContext, commandParse: any) {
    return (async () => commandContext.commandService.executingCommandParse = commandParse);
  }

  async updateHostExecutingTaskCommandAndUpdateTaskCommand(commandService: ICommandService, commandParse: any, cmd: ICommand) {
    return (async () => {
      // const commandHost = (host as unknown as ITaskHost)
      commandService.executingCommandParse = commandParse;
      await commandService.markCommandAsExecuting(cmd, commandParse);
    });
  }

}



export interface IInterviewParameterGetterOptions {
  mode: 'prefix'
}


export interface ICommandElementData {
  values: string[];
  metadata: {
    match: string;
  }
}

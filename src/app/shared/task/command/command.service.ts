import { Injectable } from '@angular/core';

import { CommandParserService } from './command-parser.service';
import { ICommand, ICommandContext, ICommandHost } from './command.models';


@Injectable({ providedIn: 'root' })
export class CommandService {

    constructor(
        private commandParserService: CommandParserService
    ) {
    }

    //#region Core Functions

    getCommand(commandId: string, host: ICommandHost) {
        const formattedCommandId = commandId.toUpperCase();
        return host.commandsSync.find(action => action.id.toUpperCase() === formattedCommandId);
    }

    async runCommand(commandId: string | ICommand, commandContext?: ICommandContext) {

        let command = commandId as ICommand;
        if (typeof commandId === 'string') {
            command = commandContext.commandService.commandsSync.find(cmd => cmd.id === commandId);
        }

        const commandParse = await this.commandParserService.parse(command.command, { ...commandContext, command });
        if (typeof commandParse === 'function') {
            await (commandParse as () => Promise<any>).bind(commandContext.host)();
        }
    }

    //#endregion

}

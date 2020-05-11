import { Client as DiscordClient } from 'discord.js';
// eslint-disable-next-line no-unused-vars
import { BotAction } from '../botAction';
import { ConsoleLogger } from '../../infra/log/consoleLogger';

export class ReadyActionService implements BotAction {
  public bind(client: DiscordClient): void {
    client.on('ready', () => {
       ConsoleLogger.instance.info('Ready Action!');
    })
  }
}

import { Client as DiscordClient } from 'discord.js';
import { ConsoleLogger } from 'infra/log/consoleLogger';
import { BotAction } from '../botAction';

export class PingAction implements BotAction {
  public async bind(client: DiscordClient): Promise<void> {
    client.on('message', (msg) => {
      if (msg.content === 'yure tem') {
        msg.reply('3 cm');
        ConsoleLogger.instance.info('Replied ping', this.constructor.name);
      }
    });
  }
}

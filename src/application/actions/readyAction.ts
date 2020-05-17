import { Client as DiscordClient } from 'discord.js';
import { BotAction } from '../botAction';
import { ConsoleLogger } from '../../infra/log/consoleLogger';

export class ReadyAction implements BotAction {
  public bind(client: DiscordClient): void {
    client.on('ready', async () => {
      ConsoleLogger.instance.info('Setting status', this.constructor.name);
      await client.user.setActivity('Falando com o Amarelo', { type: 'WATCHING' });
      await client.user.setStatus('online');
    });
  }
}

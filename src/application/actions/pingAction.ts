import { Client as DiscordClient } from 'discord.js';
import { BotAction } from '../botAction';

export class PingAction implements BotAction {
  public async bind(client: DiscordClient): Promise<void> {
    client.on('message', (msg) => {
      if (msg.content === 'yure tem') {
        msg.reply('3 cm');
      }
    });
  }
}

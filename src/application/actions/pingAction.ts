import { Client as DiscordClient } from 'discord.js';
import { BotAction } from '../botAction';

export class PingAction implements BotAction {
  public bind(client: DiscordClient): void {
    client.on('message', (msg) => {
      if (msg.content === 'yure tem') {
        msg.reply('3 cm')
      }
    });
  }
}

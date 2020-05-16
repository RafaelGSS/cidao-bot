import { Client as DiscordClient } from 'discord.js';
import { BotAction } from '../botAction';

export class ReplyActionService implements BotAction {
  public bind(client: DiscordClient): void {
    client.on('message', (msg) => {
      if (msg.content === 'gui') {
        msg.reply('viado do caralho')
      }
    })
  }
}

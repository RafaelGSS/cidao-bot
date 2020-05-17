import { Client as DiscordClient, VoiceChannel } from 'discord.js';
import { BotAction } from '../botAction';
import { ChannelService } from '../services/channelService';
import { ConsoleLogger } from '../../infra/log/consoleLogger';
import * as path from 'path';

export class HuffAction implements BotAction {
  private channelService: ChannelService;

  public bind(client: DiscordClient): void {
    this.channelService = new ChannelService(client);
    setTimeout(async () => {
      const channel = this.getChannelToJoin();
      if (!channel) {
        ConsoleLogger.instance.warn('Channel not found', this.constructor.name);
        return;
      }

      const connection = await channel.join();
      const dispatcher = connection.play(path.join(__dirname, '../../resources/gui.ogg'));

      dispatcher.on('finish', () => {
        channel.leave();
        ConsoleLogger.instance.info('Finished display huff', this.constructor.name);
      });
    }, 10000);
  }

  private getChannelToJoin(): VoiceChannel {
    const channel = this.channelService.getChannelByName('VALORANT');
    return channel;
  }

  private generateNextHuff(): Date {
    const nextTime = 5 * 60000;
    return new Date(new Date().getTime() + nextTime);
  }
}

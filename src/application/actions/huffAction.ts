import { Client as DiscordClient, VoiceChannel } from 'discord.js';
import * as path from 'path';
import { ConsoleLogger } from '../../infra/log/consoleLogger';
import { BotAction } from '../botAction';
import { ChannelService } from '../services/channelService';
import { HuffService } from '../services/huffService';

export class HuffAction implements BotAction {
  private channelService: ChannelService;

  private huffService: HuffService;

  private lastHuffIndex = 0;

  public async bind(client: DiscordClient): Promise<void> {
    this.channelService = new ChannelService(client);
    this.huffService = new HuffService();
    await this.huffService.initialize(path.join(__dirname, '../../resources'));

    this.scheduleHuff(this.generateNextHuff());
  }

  private scheduleHuff(milliseconds: number): void {
    ConsoleLogger.instance.info(`Scheduling huff at ${milliseconds} ms`, this.constructor.name);

    setTimeout(async () => {
      const channel = this.getChannelToJoin();
      if (!channel) {
        ConsoleLogger.instance.warn('Available channel not found', this.constructor.name);
      } else {
        ConsoleLogger.instance.info('Displaying huff...', this.constructor.name);
        const huff = this.getNextHuff();
        await this.huffOnChannel(channel, huff);
      }
      this.scheduleHuff(this.generateNextHuff());
    }, milliseconds);
  }

  private async huffOnChannel(channel: VoiceChannel, huff: string): Promise<void> {
    const connection = await channel.join();
    const dispatcher = connection.play(huff);

    return new Promise((resolve, reject) => {
      dispatcher.on('finish', () => {
        ConsoleLogger.instance.info('Finished display huff', this.constructor.name);
        channel.leave();
        resolve();
      });

      dispatcher.on('error', reject);
    });
  }

  private getChannelToJoin(): VoiceChannel {
    const [channel] = this.channelService
      .getChannelWithMembers()
      .sort((a, b) => (a.members.size > b.members.size ? 1 : -1));
    return channel;
  }

  private getNextHuff(): string {
    const huffs = this.huffService.getHuffs();
    if (this.lastHuffIndex >= huffs.length) {
      this.lastHuffIndex = 0;
    }
    const huffIndex = this.lastHuffIndex;
    this.lastHuffIndex += 1;
    return huffs[huffIndex];
  }

  private generateNextHuff(): number {
    return 30 * 60000;
  }
}

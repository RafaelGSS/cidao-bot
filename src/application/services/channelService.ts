import { Client as DiscordClient, Channel, TextChannel, CategoryChannel, VoiceChannel } from 'discord.js';

export class ChannelService {
  private channels: any;

  constructor(client: DiscordClient) {
    this.channels = client.channels.cache;
  }

  public getChannels(): any {
    return this.channels;
  }

  public getChannelByName(channelName: string): VoiceChannel {
    return this.channels.find((channel: TextChannel | CategoryChannel | VoiceChannel) => {
      return this.isVoiceChannel(channel) && channel.name === channelName;
    })
  }

  private isVoiceChannel(channel: Channel): boolean {
    return channel.type === 'voice';
  }
}

import { Client as DiscordClient, Channel, TextChannel, CategoryChannel, VoiceChannel, Collection, Snowflake } from 'discord.js';

export class ChannelService {
  private channels: Collection<Snowflake, Channel>;

  constructor(client: DiscordClient) {
    this.channels = client.channels.cache;
  }

  public getChannels(): any {
    return this.channels;
  }

  public getChannelWithMembers(): VoiceChannel[] {
    return this.channels.filter((channel: TextChannel | CategoryChannel | VoiceChannel) => {
      return this.isVoiceChannel(channel) && channel.members.size > 0;
    }).array() as VoiceChannel[];
  }

  public getChannelByName(channelName: string): VoiceChannel {
    return this.channels.find((channel: TextChannel | CategoryChannel | VoiceChannel) => {
      return this.isVoiceChannel(channel) && channel.name === channelName;
    }) as VoiceChannel;
  }

  private isVoiceChannel(channel: Channel): boolean {
    return channel.type === 'voice';
  }
}

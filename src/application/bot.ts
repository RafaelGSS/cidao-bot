import { Client as DiscordClient } from 'discord.js';
import { ReadyActionService } from './services/readyActionService';
import { PingActionService } from './services/pingActionService';
import { BotAction } from './botAction';
import { ReplyActionService } from './services/replyActionService';

type BotConfig = {
  discordCfg: { token: string },
};

export class Bot {
  private client: DiscordClient;

  private botActions: BotAction[];

  private config: BotConfig;

  constructor(config: BotConfig) {
    this.client = new DiscordClient();
    this.botActions = [
      new ReadyActionService(),
      new PingActionService(),
      new ReplyActionService(),
    ]
    this.config = config;
  }

  public async run(): Promise<void> {
    await this.client.login(this.config.discordCfg.token);
    return this.bindActions();
  }

  private bindActions(): void {
    this.botActions.forEach((action) => action.bind(this.client));
  }
}

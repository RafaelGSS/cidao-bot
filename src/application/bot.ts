import { Client as DiscordClient } from 'discord.js';
import { BotAction } from './botAction';
import { ReadyAction } from './actions/readyAction';
import { PingAction } from './actions/pingAction';
import { HuffAction } from './actions/huffAction';
import { KdAction } from './actions/kdAction';

type BotConfig = {
  discordCfg: { token: string };
};

export class Bot {
  private client: DiscordClient;

  private botActions: BotAction[];

  private config: BotConfig;

  constructor(config: BotConfig) {
    this.client = new DiscordClient();
    this.botActions = [
      new ReadyAction(), // Should be first
      new PingAction(),
      new HuffAction(),
      new KdAction(),
    ];
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

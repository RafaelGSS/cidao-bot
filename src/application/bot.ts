import { Client as DiscordClient } from 'discord.js';
import { BotAction } from './botAction';

type BotConfig = {
  discordCfg: { token: string },
};

export class Bot {
  private client: DiscordClient;

  private botActions: BotAction[];

  private config: BotConfig;

  // TODO: send actions and make factory
  constructor(config: BotConfig, actions: BotAction[]) {
    this.client = new DiscordClient();
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

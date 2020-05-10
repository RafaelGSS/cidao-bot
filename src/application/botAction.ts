import { Client as DiscordClient } from 'discord.js';

export interface BotAction {
  bind(client: DiscordClient): void;
}

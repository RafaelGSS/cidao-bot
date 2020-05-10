import { config } from 'dotenv';
config();
import { Bot } from './application/bot';
import discordCfg from './config/discord';

function main() {
  const bot = new Bot({ discordCfg });
  bot.run();
}

main();

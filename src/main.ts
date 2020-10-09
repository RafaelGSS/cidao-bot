import { config } from 'dotenv';
config();
import discordCfg from './config/discord';
import { Bot } from './application/bot';

function main() {
  const bot = new Bot({ discordCfg });
  bot.run();
}

main();

import { Client as DiscordClient } from 'discord.js';
import { ConsoleLogger } from '../../infra/log/consoleLogger';
import { BotAction } from '../botAction';
import { Map } from '../services/maps/map';
import { MapService } from '../services/mapService';

export class RespawnAction implements BotAction {
  private actionMessage = 'Cidao, mapa';

  private mapService: MapService;

  public async bind(client: DiscordClient): Promise<void> {
    client.on('message', (message) => {
      if (message.content.includes(this.actionMessage)) {
        ConsoleLogger.instance.info('Received message', this.constructor.name);
        const map = this.parseContent(message.content);

        if (map) {
          const respaws = map.getRespawn();
        }
        return message.reply(`Tu digitou errado vacilao. Tenta: ${this.actionMessage}`);
      }
    });
  }

  private parseContent(content: string): Map {
    try {
      const [map] = content.split(this.actionMessage)[1].split(' ');
      return this.mapService.findMapByName(map);
    } catch (error) {
      return undefined;
    }
  }
}

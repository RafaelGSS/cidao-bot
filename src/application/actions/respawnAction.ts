import { Client as DiscordClient, MessageAttachment } from 'discord.js';
import { ConsoleLogger } from '../../infra/log/consoleLogger';
import { BotAction } from '../botAction';
import { Map } from '../services/maps/map';
import { MapService } from '../services/mapService';

export class RespawnAction implements BotAction {
  private actionMessage = 'Cidao, mapa';

  private mapService: MapService;

  constructor() {
    this.mapService = new MapService();
  }

  public async bind(client: DiscordClient): Promise<void> {
    client.on('message', (message) => {
      if (!message.author.bot && message.content.includes(this.actionMessage)) {
        ConsoleLogger.instance.info('Received message', this.constructor.name);
        const map = this.parseContent(message.content);

        if (map) {
          const respawns = map.getRespawn();
          const attachments = respawns.map((respawn) => new MessageAttachment(respawn));
          return message.channel.send(`${message.author}`, attachments);
        }
        const allMapsName = this.mapService.getAllMaps().map((m) => m.getName());
        return message.reply(
          `Tu digitou errado vacilao. Tenta: ${this.actionMessage} ${allMapsName.join(',')}`,
        );
      }
    });
  }

  private parseContent(content: string): Map {
    try {
      const [map] = content.split(this.actionMessage)[1].trim().split(' ');
      return this.mapService.findMapByName(map);
    } catch (error) {
      ConsoleLogger.instance.error(error.message);
      return undefined;
    }
  }
}

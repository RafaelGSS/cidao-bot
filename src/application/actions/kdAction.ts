import { Client as DiscordClient } from 'discord.js';
import { ConsoleLogger } from '../../infra/log/consoleLogger';
import { BotAction } from '../botAction';

export type KDIncrease = {
  goal: number;
  kills: number;
};

export type KDDecrease = {
  goal: number;
  deaths: number;
};

export class KdAction implements BotAction {
  private actionMessage = 'Cidao, calcula meu kd';

  public async bind(client: DiscordClient): Promise<void> {
    client.on('message', (message) => {
      if (message.content.includes(this.actionMessage)) {
        ConsoleLogger.instance.info('Received message', this.constructor.name);
        const parsedContent = this.parseContent(message.content);

        if (this.isValidContent(parsedContent)) {
          const [kill, death] = parsedContent;
          const kd = this.calculateKD(kill, death);
          const toIncrease = this.calcIncreaseKdAt(kill, death, kd + 11);
          const toDecrease = this.calcDecreaseKdAt(kill, death, kd - 11);
          return message.reply(this.formatMessage(toIncrease, toDecrease));
        }
        return message.reply(`Tu digitou errado vacilao. Tenta: ${this.actionMessage} KILLS/MORTES`);
      }
    });
  }

  private formatMessage(toIncrease: KDIncrease[], toDecrease: KDDecrease[]): string {
    const toIncreaseStr = toIncrease.map(({ goal, kills }) => {
      return `Para: ${goal}% - ${kills} kiils`;
    }).join('\n');
    const toDecreaseStr = toDecrease.map(({ goal, deaths }) => {
      return `Para: ${goal}% ${deaths} deaths`;
    }).join('\n');

    return `
      Pra aumentar :heavy_check_mark: :\n${toIncreaseStr}

      Pra diminuir :warning: :\n${toDecreaseStr}
    `;
  }

  private calculateKD(kills: number, deaths: number): number {
    return Math.round((kills / (kills + deaths)) * 100);
  }

  private calcIncreaseKdAt(kills: number, deaths: number, at: number): KDIncrease[] {
    const kd = this.calculateKD(kills, deaths);
    const maxIncrease = [];
    for (let i = 1; i < at - kd; i += 1) {
      if (kd + i > 100) break;

      maxIncrease.push({
        goal: kd + i,
        kills: this.calcIncreaseKd(kills, deaths, kd + i),
      });
    }
    return maxIncrease;
  }

  private calcDecreaseKdAt(kills: number, deaths: number, at: number): KDDecrease[] {
    const kd = this.calculateKD(kills, deaths);
    const maxDecrease = [];
    for (let i = 1; i < kd - at; i += 1) {
      if (kd - i <= 0) break;

      maxDecrease.push({
        goal: kd - i,
        deaths: this.calcDecreaseKd(kills, deaths, kd - i),
      });
    }
    return maxDecrease;
  }

  private calcDecreaseKd(kills: number, deaths: number, goalKd: number): number {
    let kd = this.calculateKD(kills, deaths);
    let prevKd = kills - 1;
    while (kd !== goalKd) {
      kd = this.calculateKD(prevKd, deaths);
      prevKd -= 1;
    }
    return prevKd - 1 - kills;
  }

  private calcIncreaseKd(kills: number, deaths: number, goalKd: number): number {
    let kd = this.calculateKD(kills, deaths);
    let prevKd = kills + 1;
    while (kd !== goalKd) {
      kd = this.calculateKD(prevKd, deaths);
      prevKd += 1;
    }
    return prevKd - 1 - kills;
  }

  private parseContent(content: string): number[] {
    try {
      const [match] = content.match(/[0-9]+\/[0-9]+/g);
      return match.split('/').map((i) => +i);
    } catch (error) {
      return [];
    }
  }

  private isValidContent(content: number[]): boolean {
    return content.length === 2;
  }
}

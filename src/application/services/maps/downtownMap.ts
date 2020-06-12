import { Map } from './map';

export class DowntownMap implements Map {
  getName(): string {
    return 'downtown';
  }

  getRespawn(): string[] {
    return ['downtown-ct.jpeg', 'downtown-tr.jpeg'];
  }
}


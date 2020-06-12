import { Map } from './map';

export class LuxvilleMap implements Map {
  getName(): string {
    return 'luxville';
  }

  getRespawn(): string[] {
    return ['downtown-ct.jpeg', 'downtown-tr.jpeg'];
  }
}

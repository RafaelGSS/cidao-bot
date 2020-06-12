import { Map } from './map';

export class SandstormMap implements Map {
  getName(): string {
    return 'sandstorm';
  }

  getRespawn(): string[] {
    return ['downtown-ct.jpeg', 'downtown-tr.jpeg'];
  }
}

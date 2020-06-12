import { Map } from './map';
import { fromResource } from '../../../resources';

export class SandstormMap implements Map {
  getName(): string {
    return 'sandstorm';
  }

  getRespawn(): string[] {
    return [
      fromResource('sandstorm-ct.jpeg'),
      fromResource('sandstorm-tr.jpeg'),
    ];
  }
}

import { Map } from './map';
import { fromResource } from '../../../resources';

export class LuxvilleMap implements Map {
  getName(): string {
    return 'luxville';
  }

  getRespawn(): string[] {
    return [
      fromResource('luxville-ct.jpeg'),
      fromResource('luxville-tr.jpeg'),
    ];
  }
}

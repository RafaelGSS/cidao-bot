import { Map } from './map';
import { fromResource } from '../../../resources';

export class DowntownMap implements Map {
  getName(): string {
    return 'downtown';
  }

  getRespawn(): string[] {
    return [
      fromResource('downtown-ct1.jpeg'),
      fromResource('downtown-ct2.jpeg'),
      fromResource('downtown-tr.jpeg'),
    ];
  }
}


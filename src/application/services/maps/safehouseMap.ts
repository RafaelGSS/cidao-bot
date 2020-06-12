import { Map } from './map';
import { fromResource } from '../../../resources';

export class SafehouseMap implements Map {
  getName(): string {
    return 'safehouse';
  }

  getRespawn(): string[] {
    return [
      fromResource('safehouse-ct.jpeg'),
      fromResource('safehouse-tr.jpeg'),
    ];
  }
}

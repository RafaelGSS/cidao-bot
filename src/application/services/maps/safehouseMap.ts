import { Map } from './map';

export class SafehouseMap implements Map {
  getName(): string {
    return 'safehouse';
  }

  getRespawn(): string[] {
    return ['downtown-ct.jpeg', 'downtown-tr.jpeg'];
  }
}

import { Map } from './maps/map';
import { LuxvilleMap } from './maps/luxvilleMap';
import { SafehouseMap } from './maps/safehouseMap';
import { DowntownMap } from './maps/downtownMap';
import { SandstormMap } from './maps/sandstormMap';

export class MapService {
  private allMaps: Map[];

  constructor() {
    this.allMaps = [
      new LuxvilleMap(),
      new SafehouseMap(),
      new DowntownMap(),
      new SandstormMap(),
    ];
  }

  public getAllMaps(): Map[] {
    return this.allMaps;
  }

  public findMapByName(name: string): Map | undefined {
    return this.allMaps.find((map) => map.getName() === name);
  }
}

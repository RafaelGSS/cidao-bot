import { promisify } from 'util';
import * as fs from 'fs';

const readDir = promisify(fs.readdir);

export class HuffService {
  private huffs: string[];

  constructor() {
    this.huffs = [];
  }

  public async initialize(dir?: string): Promise<void> {
    const files = await readDir(dir);
    this.huffs = files.map((file) => `${dir}/${file}`);
  }

  public getHuffs(): string[] {
    return this.huffs;
  }
}

export const resourcesPath = 'https://github.com/RafaelGSS/cidao-bot/blob/master/src/resources/maps';

export function fromResource(resource: string): string {
  return `${resourcesPath}/${resource}?raw=true`;
}

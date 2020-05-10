import { Logger } from './logger';

export class ConsoleLogger implements Logger {
  private static instanceLogger: ConsoleLogger;

  constructor() {}

  public static get instance(): ConsoleLogger {
    if (!ConsoleLogger.instanceLogger) {
      ConsoleLogger.instanceLogger = new ConsoleLogger();
    }
    return ConsoleLogger.instanceLogger;
  }

  public info(message: string): void {
    console.info(message);
  }

  public warn(message: string): void {
    console.warn(message);
  }

  public error(message: string): void {
    console.error(message);
  }
}

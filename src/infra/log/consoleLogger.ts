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

  public info(message: any, context?: string): void {
    console.info(`[${context}] ${message}`);
  }

  public warn(message: any, context?: string): void {
    console.warn(`[${context}] ${message}`);
  }

  public error(message: any, context?: string): void {
    console.error(`[${context}] ${message}`);
  }
}

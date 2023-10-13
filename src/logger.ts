/**
 * Interface for a logger that can log error and info messages.
 * @interface
 */
export interface LoggerInterface {
  error(message: string): void;
  info(message: string): void;
}

/**
 * Logger class for logging error and info messages.
 * @class
 */
export class Logger implements LoggerInterface {
  private _enabled: boolean;

  /**
   * Creates a new Logger instance.
   *
   * @param {boolean} shouldLog - Determines if the logger should log messages.
   */
  constructor(shouldLog: boolean) {
    this._enabled = shouldLog;
  }

  /**
   * Logs an error message.
   *
   * @param {string} message - The error message to be logged.
   */
  error(message: string): void {
    if (this._enabled) {
      console.error(message);
    }
  }

  /**
   * Logs an info message.
   *
   * @param {string} message - The info message to be logged.
   */
  info(message: string): void {
    if (this._enabled) {
      console.info(message);
    }
  }
}

export interface LoggerInterface {
  error(message: string): void;
  info(message: string): void;
}

export class Logger implements LoggerInterface {
  private _enabled: boolean;

  constructor(shouldLog: boolean) {
    this._enabled = shouldLog;
  }

  error(message: string): void {
    if (this._enabled) {
      console.error(message);
    }
  }

  info(message: string): void {
    if (this._enabled) {
      console.info(message);
    }
  }
}

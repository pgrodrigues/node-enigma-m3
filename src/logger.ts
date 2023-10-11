export interface EnigmaLogger {
  error(message: string): void;
  info(message: string): void;
}

export class Logger implements EnigmaLogger {
  private enabled: boolean;

  constructor(shouldLog: boolean) {
    this.enabled = shouldLog;
  }

  error(message: string): void {
    if (this.enabled) {
      console.error(message);
    }
  }

  info(message: string): void {
    if (this.enabled) {
      console.info(message);
    }
  }
}

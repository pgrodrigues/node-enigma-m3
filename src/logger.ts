class Logger {
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

export default Logger;
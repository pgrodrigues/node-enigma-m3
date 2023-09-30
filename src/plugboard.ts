import type Logger from "logger";

class Plugboard {
  private logger: Logger;

  private pairs: string[] = [];

  constructor(logger: Logger) {
    this.logger = logger;
  }

  configure(pairs: string[]): void {
    if (!pairs) {
      const errorMessage = "Plugboard settings are missing";
      this.logger.error(errorMessage);
      throw new Error(errorMessage);
    }

    if (!Array.isArray(pairs)) {
      const errorMessage = "Plugboard pairs must be an array";
      this.logger.error(errorMessage);
      throw new Error(errorMessage);
    }

    if (pairs.length > 0) {
      if (pairs.some((p) => p.length !== 2)) {
        const errorMessage = "Each plugboard pair must consist of exactly two letters";
        this.logger.error(errorMessage);
        throw new Error(errorMessage);
      }
      if (!/^(?:(.)(?!.*?\1))+$/.test(pairs.join(""))) {
        const errorMessage = "Plugboard pairs must not contain duplicate letters";
        this.logger.error(errorMessage);
        throw new Error(errorMessage);
      }
    }

    this.pairs = [...pairs];
  }

  scramble(letter: string): string {
    let outputLetter = letter;

    for (const pair of this.pairs) {
      if (pair[0] === letter) {
        outputLetter = pair[1];
        break;
      }
      if (pair[1] === letter) {
        outputLetter = pair[0];
        break;
      }
    }

    this.logger.info(`[Plugboard] ${letter} => ${outputLetter}`);
    return outputLetter;
  }
}

export default Plugboard;

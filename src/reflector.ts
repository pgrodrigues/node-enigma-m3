import type Logger from "logger";

interface EnigmaReflector {
  pairs: string[];
  type: string;
}

class Reflector {
  private readonly AVAILABLE_REFLECTORS: EnigmaReflector[] = [
    {
      pairs: ["AE", "BJ", "CM", "DZ", "FL", "GY", "HX", "IV", "KW", "NR", "OQ", "PU", "ST"],
      type: "A"
    },
    {
      pairs: ["AY", "BR", "CU", "DH", "EQ", "FS", "GL", "IP", "JX", "KN", "MO", "TZ", "VW"],
      type: "B"
    },
    {
      pairs: ["AF", "BV", "CP", "DJ", "EI", "GO", "HY", "KR", "LZ", "MX", "NW", "TQ", "SU"],
      type: "C"
    },
    {
      pairs: ["AE", "BN", "CK", "DQ", "FU", "GY", "HW", "IJ", "LO", "MP", "RX", "SZ", "TV"],
      type: "B Thin"
    },
    {
      pairs: ["AR", "BD", "CO", "EJ", "FN", "GT", "HK", "IV", "LM", "PW", "QZ", "SX", "UY"],
      type: "C Thin"
    }
  ];

  private logger: Logger;

  private reflector: EnigmaReflector | undefined;

  constructor(logger: Logger) {
    this.logger = logger;
  }

  configure(type: string): void {
    if (!type) {
      const errorMessage: string = "Reflector settings are missing";
      this.logger.error(errorMessage);
      throw new Error(errorMessage);
    }

    const reflectorFound = this.AVAILABLE_REFLECTORS.find(
      (availableReflector) => availableReflector.type === type
    );

    if (!reflectorFound) {
      const errorMessage: string = `Invalid reflector type: ${type}`;
      this.logger.error(errorMessage);
      throw new Error(errorMessage);
    }

    this.reflector = reflectorFound;
  }

  scramble(letter: string): string {
    if (!this.reflector) {
      const errorMessage: string = "Reflector not configured";
      this.logger.error(errorMessage);
      throw new Error(errorMessage);
    }

    let outputLetter: string = letter;

    for (const pair of this.reflector.pairs) {
      if (pair[0] === letter) {
        outputLetter = pair[1];
        break;
      }
      if (pair[1] === letter) {
        outputLetter = pair[0];
        break;
      }
    }

    this.logger.info(`[Reflector ${this.reflector.type}] ${letter} => ${outputLetter}`);
    return outputLetter;
  }
}

export default Reflector;

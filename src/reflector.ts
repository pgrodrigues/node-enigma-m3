import { LoggerInterface } from "./logger";

type AvailableReflector = {
  pairs: string[];
  type: string;
};

export interface ReflectorInterface {
  configure(type: string): void;
  scramble(letter: string): string;
}

export class Reflector implements ReflectorInterface {
  private readonly AVAILABLE_REFLECTORS: AvailableReflector[] = [
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

  private _logger: LoggerInterface;

  private _reflector: AvailableReflector | undefined;

  constructor(logger: LoggerInterface) {
    this._logger = logger;
  }

  configure(type: string): void {
    if (!type) {
      const errorMessage: string = "Reflector settings are missing";
      this._logger.error(errorMessage);
      throw new Error(errorMessage);
    }

    const reflectorFound = this.AVAILABLE_REFLECTORS.find(
      (availableReflector) => availableReflector.type === type
    );

    if (!reflectorFound) {
      const errorMessage: string = `Invalid reflector type: ${type}`;
      this._logger.error(errorMessage);
      throw new Error(errorMessage);
    }

    this._reflector = reflectorFound;
  }

  scramble(letter: string): string {
    if (!this._reflector) {
      const errorMessage: string = "Reflector not configured";
      this._logger.error(errorMessage);
      throw new Error(errorMessage);
    }

    let outputLetter: string = letter;

    for (const pair of this._reflector.pairs) {
      if (pair[0] === letter) {
        outputLetter = pair[1];
        break;
      }
      if (pair[1] === letter) {
        outputLetter = pair[0];
        break;
      }
    }

    this._logger.info(`[Reflector ${this._reflector.type}] ${letter} => ${outputLetter}`);
    return outputLetter;
  }
}

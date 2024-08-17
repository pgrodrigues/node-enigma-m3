import { LoggerInterface } from "./logger";

/**
 * Interface representing the configuration of a reflector for the Enigma machine.
 * @interface
 */
export interface AvailableReflector {
  pairs: string[];
  type: string;
}

/**
 * Interface for a reflector that can configure its type and scramble input letters.
 * @interface
 */
export interface ReflectorInterface {
  configure(type: string): void;
  scramble(letter: string): string;
}

/**
 * Class representing a reflector for configuring reflector types and scrambling input letters.
 * @class
 */
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

  /**
   * Creates a new Reflector instance with the specified logger.
   *
   * @param {LoggerInterface} logger - A logger for error and information messages.
   */
  constructor(logger: LoggerInterface) {
    this._logger = logger;
  }

  /**
   * Validates and configures the reflector settings for the Enigma machine.
   *
   * @param {string} type - The type of reflector to be configured.
   * @throws {Error} If the settings do not allow to correctly configure the reflector.
   */
  configure(type: string): void {
    if (!type) {
      const errorMessage = "Reflector settings are missing";
      this._logger.error(errorMessage);
      throw new Error(errorMessage);
    }

    const reflectorFound: AvailableReflector | undefined = this.AVAILABLE_REFLECTORS.find(
      (availableReflector) => availableReflector.type === type
    );

    if (!reflectorFound) {
      const errorMessage = `Invalid reflector type: ${type}`;
      this._logger.error(errorMessage);
      throw new Error(errorMessage);
    }

    this._reflector = reflectorFound;
  }

  /**
   * Scrambles an input letter using the configured reflector.
   *
   * @param {string} letter - The input letter to be scrambled.
   * @returns {string} The scrambled output letter.
   * @throws {Error} If the reflector is not correctly configured.
   */
  scramble(letter: string): string {
    if (!this._reflector) {
      const errorMessage = "Reflector not configured";
      this._logger.error(errorMessage);
      throw new Error(errorMessage);
    }

    let outputLetter = letter;

    const pair = this._reflector.pairs.find(
      ([first, second]) => first === letter || second === letter
    );

    if (pair) {
      const [first, second] = pair;
      outputLetter = first === letter ? second : first;
    }

    this._logger.info(`[Reflector ${this._reflector.type}] ${letter} => ${outputLetter}`);
    return outputLetter;
  }
}

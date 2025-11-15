import { LoggerInterface } from "./logger";

/**
 * Interface for a plugboard that can configure pairs of letters and scramble input letters.
 * @interface
 */
export interface PlugboardInterface {
  configure(pairs?: string[]): void;
  scramble(letter: string): string;
}

/**
 * Class representing a plugboard for configuring letter pairs and scrambling input letters.
 * @class
 */
export class Plugboard implements PlugboardInterface {
  private _logger: LoggerInterface;

  private _pairs: string[] = [];

  /**
   * Creates a new Plugboard instance with the specified logger.
   *
   * @param {LoggerInterface} logger - A logger for error and information messages.
   */
  constructor(logger: LoggerInterface) {
    this._logger = logger;
  }

  /**
   * Validates and configures the plugboard settings for the Enigma machine.
   *
   * @param {string[] | undefined} pairs - An array of letter pairs, where each pair consists of two letters.
   * @throws {Error} If the settings do not allow to correctly configure the plugboard.
   */
  configure(pairs?: string[]): void {
    if (!pairs) {
      const errorMessage = "Plugboard settings are missing";
      this._logger.error(errorMessage);
      throw new Error(errorMessage);
    }

    if (!Array.isArray(pairs)) {
      const errorMessage = "Plugboard pairs must be an array";
      this._logger.error(errorMessage);
      throw new Error(errorMessage);
    }

    if (pairs.length > 0) {
      if (pairs.some((p) => p.length !== 2)) {
        const errorMessage = "Each plugboard pair must consist of exactly two letters";
        this._logger.error(errorMessage);
        throw new Error(errorMessage);
      }
      if (!/^(?:(.)(?!.*?\1))+$/.test(pairs.join(""))) {
        const errorMessage = "Plugboard pairs must not contain duplicate letters";
        this._logger.error(errorMessage);
        throw new Error(errorMessage);
      }
    }

    this._pairs = [...pairs];
  }

  /**
   * Scrambles an input letter using the configured plugboard.
   *
   * @param {string} letter - The input letter to be scrambled.
   * @returns {string} The scrambled output letter.
   */
  scramble(letter: string): string {
    let outputLetter = letter;

    // When no plugboard pairs are connected, return the input letter

    const pair = this._pairs.find(([first, second]) => first === letter || second === letter);

    if (pair) {
      const [first, second] = pair;
      outputLetter = first === letter ? second : first;
    }

    this._logger.info(`[Plugboard] ${letter} => ${outputLetter}`);
    return outputLetter;
  }
}

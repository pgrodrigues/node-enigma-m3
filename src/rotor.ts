import { applyOffsetToLetter, getLetterFromIndex, getLetterIndex } from "./utils";
import { LoggerInterface } from "./logger";

/**
 * Interface for a rotor, representing its properties and methods.
 * @interface
 */
export interface RotorInterface {
  readonly position: string;
  readonly stepCount: number;
  readonly turnover: string[];
  readonly type: string;
  scramble(letter: string, rightToLeft: boolean): string;
  step(): void;
}

/**
 * Class representing a rotor in the Enigma machine.
 * @class
 */
export class Rotor implements RotorInterface {
  private _logger: LoggerInterface;

  private _offset: string;

  private _position: string;

  private _ring: string;

  private _stepCount = 0;

  private _turnover: string[];

  private _type: string;

  /**
   * Creates a new Rotor instance with the specified properties.
   *
   * @param {string} offset - The rotor's ring offset.
   * @param {string} position - The initial position of the rotor.
   * @param {string} ring - The rotor's ring.
   * @param {string[]} turnover - An array of turnover notches on the rotor.
   * @param {string} type - The type of the rotor.
   * @param {LoggerInterface} logger - The logger instance for logging rotor operations.
   */
  constructor(
    offset: string,
    position: string,
    ring: string,
    turnover: string[],
    type: string,
    logger: LoggerInterface
  ) {
    this._logger = logger;
    this._offset = offset;
    this._position = position;
    this._ring = ring;
    this._turnover = turnover;
    this._type = type;
  }

  /**
   * Scrambles an input letter using the rotor, either from right to left or left to right.
   *
   * @param {string} letter - The input letter to be scrambled.
   * @param {boolean} rightToLeft - If `true`, the scrambling is done from right to left; if `false`, from left to right.
   * @returns {string} The scrambled output letter.
   */
  scramble(letter: string, rightToLeft: boolean): string {
    let outputLetter = applyOffsetToLetter(letter, getLetterIndex(this._position));

    const entryContactLetter = applyOffsetToLetter(outputLetter, -getLetterIndex(this._offset));

    if (rightToLeft) {
      outputLetter = this._ring.charAt(getLetterIndex(entryContactLetter));
    } else {
      outputLetter = getLetterFromIndex(this._ring.indexOf(entryContactLetter));
    }

    const exitContactLetter = applyOffsetToLetter(outputLetter, getLetterIndex(this._offset));

    outputLetter = applyOffsetToLetter(exitContactLetter, -getLetterIndex(this._position));

    this._logger.info(
      `[Rotor ${this._type}] ${letter} => [ ${entryContactLetter} => ${exitContactLetter} ] => ${outputLetter}`
    );
    return outputLetter;
  }

  /**
   * Steps the rotor to its next position.
   */
  step(): void {
    this._position = applyOffsetToLetter(this._position, 1);
    this._stepCount += 1;

    this._logger.info(`[Rotor ${this._type}] position is now ${this._position}`);
  }

  /**
   * Get the current position of the rotor.
   * @type {string}
   */
  get position() {
    return this._position;
  }

  /**
   * Get the number of steps the rotor has taken.
   * @type {number}
   */
  get stepCount() {
    return this._stepCount;
  }

  /**
   * Get the array of turnover notches on the rotor.
   * @type {string[]}
   */
  get turnover() {
    return this._turnover;
  }

  /**
   * Get the type of the rotor.
   * @type {string}
   */
  get type() {
    return this._type;
  }
}

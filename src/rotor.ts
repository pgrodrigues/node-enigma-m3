import { LoggerInterface } from "./logger";
import { Utils } from "./utils";

export interface RotorInterface {
  readonly position: string;
  readonly stepCount: number;
  readonly turnover: string[];
  readonly type: string;
  scramble(letter: string, rightToLeft: boolean): string;
  step(): void;
}

export class Rotor implements RotorInterface {
  private _logger: LoggerInterface;

  private _offset: string;

  private _position: string;

  private _ring: string;

  private _stepCount: number = 0;

  private _turnover: string[];

  private _type: string;

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

  scramble(letter: string, rightToLeft: boolean): string {
    let outputLetter: string = Utils.applyOffsetToLetter(
      letter,
      Utils.getLetterIndex(this._position)
    );

    const entryContactLetter: string = Utils.applyOffsetToLetter(
      outputLetter,
      -Utils.getLetterIndex(this._offset)
    );

    if (rightToLeft) {
      outputLetter = this._ring.charAt(Utils.getLetterIndex(entryContactLetter));
    } else {
      outputLetter = Utils.getLetterFromIndex(this._ring.indexOf(entryContactLetter));
    }

    const exitContactLetter: string = Utils.applyOffsetToLetter(
      outputLetter,
      Utils.getLetterIndex(this._offset)
    );

    outputLetter = Utils.applyOffsetToLetter(
      exitContactLetter,
      -Utils.getLetterIndex(this._position)
    );

    this._logger.info(
      `[Rotor ${this._type}] ${letter} => [ ${entryContactLetter} => ${exitContactLetter} ] => ${outputLetter}`
    );
    return outputLetter;
  }

  step(): void {
    this._position = Utils.applyOffsetToLetter(this._position, 1);
    this._stepCount += 1;

    this._logger.info(`[Rotor ${this._type}] position is now ${this._position}`);
  }

  get position() {
    return this._position;
  }

  get stepCount() {
    return this._stepCount;
  }

  get turnover() {
    return this._turnover;
  }

  get type() {
    return this._type;
  }
}

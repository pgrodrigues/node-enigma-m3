import { LoggerInterface } from "./logger";
import { Rotor, RotorInterface } from "./rotor";
import Utils from "./utils";

/**
 * Interface representing the default properties of a rotor for the Enigma machine.
 * @interface
 */
export interface AvailableRotor {
  ring: string;
  turnover: string[];
  type: string;
}

/**
 * Interface for rotor settings, representing the configuration of a rotor.
 * @interface
 */
export interface RotorSettingsInterface {
  offset: string | number;
  position: string | number;
  type: string;
}

/**
 * Interface for rotors, representing their properties and methods.
 * @interface
 */
export interface RotorsInterface {
  configure(rotorSettings: RotorSettingsInterface[]): void;
  scramble(letter: string, rightToLeft: boolean): string;
}

/**
 * Class representing the rotor assembly in the Enigma machine.
 * @class
 */
export class Rotors implements RotorsInterface {
  private readonly AVAILABLE_ROTORS: AvailableRotor[] = [
    { ring: "EKMFLGDQVZNTOWYHXUSPAIBRCJ", turnover: ["R"], type: "I" },
    { ring: "AJDKSIRUXBLHWTMCQGZNPYFVOE", turnover: ["F"], type: "II" },
    { ring: "BDFHJLCPRTXVZNYEIWGAKMUSQO", turnover: ["W"], type: "III" },
    { ring: "ESOVPZJAYQUIRHXLNFTGKDCMWB", turnover: ["K"], type: "IV" },
    { ring: "VZBRGITYUPSDNHLXAWMJQOFECK", turnover: ["A"], type: "V" },
    { ring: "JPGVOUMFYQBENHZRDKASXLICTW", turnover: ["A", "N"], type: "VI" },
    { ring: "NZJHGRCXMYSWBOUFAIVLPEKQDT", turnover: ["A", "N"], type: "VII" },
    { ring: "FKQHTLXOCBJSPDZRAMEWNIUYGV", turnover: ["A", "N"], type: "VIII" }
  ];

  private _logger: LoggerInterface;

  private _rotors: RotorInterface[] = [];

  /**
   * Creates a new Rotors instance with the specified logger.
   *
   * @param {LoggerInterface} logger - The logger instance for logging rotor operations.
   */
  constructor(logger: LoggerInterface) {
    this._logger = logger;
  }

  /**
   * Validates and configures the rotor settings for the Enigma machine.
   *
   * @param {RotorSettingsInterface[]} rotorsSettings - An array of rotor settings.
   * @throws {Error} If the rotors settings do not allow to correctly configure the rotors.
   */
  configure(rotorsSettings: RotorSettingsInterface[]): void {
    if (!rotorsSettings) {
      const errorMessage = "Rotors settings are missing";
      this._logger.error(errorMessage);
      throw new Error(errorMessage);
    }

    if (!Array.isArray(rotorsSettings)) {
      const errorMessage = "Rotors settings must be an array";
      this._logger.error(errorMessage);
      throw new Error(errorMessage);
    }

    if (
      rotorsSettings.length !== 3 ||
      !rotorsSettings.every(
        (s) =>
          Object.prototype.hasOwnProperty.call(s, "offset") &&
          Object.prototype.hasOwnProperty.call(s, "position") &&
          Object.prototype.hasOwnProperty.call(s, "type")
      )
    ) {
      const errorMessage =
        "Rotors settings must include the ring offset, position and type of the three rotors";
      this._logger.error(errorMessage);
      throw new Error(errorMessage);
    }

    // Define the rotors
    const rotors: RotorInterface[] = [];
    rotorsSettings.forEach((rs) => {
      const rotor: AvailableRotor | undefined = this.AVAILABLE_ROTORS.find(
        (availableRotor) => availableRotor.type === rs.type
      );
      let offset: string;
      let position: string;

      if (!rotor) {
        const errorMessage = `Invalid rotor type: ${rs.type}`;
        this._logger.error(errorMessage);
        throw new Error(errorMessage);
      }

      if (rotors.some((r) => r.type === rs.type)) {
        const errorMessage = `There can't be multiple rotors of the same type: ${rs.type}`;
        this._logger.error(errorMessage);
        throw new Error(errorMessage);
      }

      if (typeof rs.position === "string" && /^[A-Z]$/.test(rs.position)) {
        position = rs.position;
      } else if (typeof rs.position === "number" && rs.position > 0 && rs.position < 27) {
        position = Utils.getLetterFromIndex(rs.position - 1);
      } else {
        const errorMessage = "Invalid rotor position";
        this._logger.error(errorMessage);
        throw new Error(errorMessage);
      }

      if (typeof rs.offset === "string" && /^[A-Z]$/.test(rs.offset)) {
        offset = rs.offset;
      } else if (typeof rs.offset === "number" && rs.offset > 0 && rs.offset < 27) {
        offset = Utils.getLetterFromIndex(rs.offset - 1);
      } else {
        const errorMessage = "Invalid rotor ring offset";
        this._logger.error(errorMessage);
        throw new Error(errorMessage);
      }

      rotors.push(
        new Rotor(offset, position, rotor.ring, rotor.turnover, rotor.type, this._logger)
      );
    });

    this._rotors = [...rotors].reverse();
  }

  /**
   * Scrambles an input letter using the configured rotors.
   *
   * @param {string} letter - The input letter to be scrambled.
   * @param {boolean} rightToLeft - If `true`, the scrambling is done from right to left; if `false`, from left to right.
   * @returns {string} The scrambled output letter.
   * @throws {Error} If the rotors are not correctly configured.
   */
  scramble(letter: string, rightToLeft: boolean): string {
    if (this._rotors.length === 0) {
      const errorMessage = "Rotors not configured";
      this._logger.error(errorMessage);
      throw new Error(errorMessage);
    }

    let outputLetter = letter;
    this._logger.info(
      `Current positions: [${this._rotors[2].position}] [${this._rotors[1].position}] [${this._rotors[0].position}]`
    );

    if (rightToLeft) {
      // During right-to-left flow, the rotors are stepped before each letter is encrypted
      let midStepped = false;

      // Always rotate the rightmost rotor
      this._rotors[0].step();

      // Check for turnover of the rightmost rotor
      if (this._rotors[0].turnover.includes(this._rotors[0].position)) {
        this._logger.info(`[Rotor ${this._rotors[0].type}] turnover position`);
        this._rotors[1].step();
        midStepped = true;
      }

      // Check for turnover of the middle rotor
      if (
        this._rotors[1].turnover.includes(Utils.applyOffsetToLetter(this._rotors[1].position, 1))
      ) {
        if (this._rotors[1].stepCount % 26 === 0) {
          this._logger.info(`[Rotor ${this._rotors[1].type}] turnover position`);
          this._rotors[1].step();
          this._rotors[2].step();
        } else if (
          // Check for double stepping of the middle rotor
          !midStepped
        ) {
          this._rotors[2].step();
          if (this._rotors[2].turnover.includes(this._rotors[2].position)) {
            this._rotors[1].step();
          }
        }
      }

      outputLetter = this._rotors[0].scramble(outputLetter, rightToLeft);
      outputLetter = this._rotors[1].scramble(outputLetter, rightToLeft);
      outputLetter = this._rotors[2].scramble(outputLetter, rightToLeft);
    } else {
      outputLetter = this._rotors[2].scramble(outputLetter, rightToLeft);
      outputLetter = this._rotors[1].scramble(outputLetter, rightToLeft);
      outputLetter = this._rotors[0].scramble(outputLetter, rightToLeft);
    }

    return outputLetter;
  }
}

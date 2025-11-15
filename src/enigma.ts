import { Logger, LoggerInterface } from "./logger";
import { Plugboard, PlugboardInterface } from "./plugboard";
import { Reflector, ReflectorInterface } from "./reflector";
import { Rotors, RotorSettingsInterface, RotorsInterface } from "./rotors";

/**
 * Interface for Enigma machine settings, including plugboard, reflector and rotor configurations.
 * @interface
 */
export interface SettingsInterface {
  plugboard: string[];
  reflector: string;
  rotors: RotorSettingsInterface[];
}

/**
 * Interface for an Enigma machine that can be configured and used to cipher words.
 * @interface
 */
export interface EnigmaInterface {
  configure(settings: SettingsInterface): void;
  cypher(word: string): string;
}

/**
 * Class representing an Enigma machine for configuring and ciphering words.
 * @class
 */
export class Enigma implements EnigmaInterface {
  private _logger: LoggerInterface;

  private _plugboard: PlugboardInterface;

  private _reflector: ReflectorInterface;

  private _rotors: RotorsInterface;

  /**
   * Creates a new Enigma instance.
   *
   * @param {boolean} [shouldLog=false] - Determines if the logger should log messages.
   */
  constructor(shouldLog = false) {
    this._logger = new Logger(shouldLog);
    this._plugboard = new Plugboard(this._logger);
    this._reflector = new Reflector(this._logger);
    this._rotors = new Rotors(this._logger);
  }

  /**
   * Internal method to process a single letter and return the ciphered output.
   *
   * @private
   * @param {string} letter - The input letter to be ciphered.
   * @returns {string} The ciphered output letter.
   */
  private pressLetter(letter: string): string {
    // On the plugboard, if the socket of the letter being cyphered is connected to the socket of another letter, the letter being cyphered gets that value
    let outputLetter = this._plugboard.scramble(letter);

    // The rotors will move accordingly providing additional scrambling (from right to left)
    outputLetter = this._rotors.scramble(outputLetter, true);

    // The reflector returns the wired letter
    outputLetter = this._reflector.scramble(outputLetter);

    // The signal will go through the rotors once again providing additional scrambling (from left to right)
    outputLetter = this._rotors.scramble(outputLetter, false);

    // The plugboard scrambles the letter again if the letter socket is connected to another letter socket
    outputLetter = this._plugboard.scramble(outputLetter);

    // The output letter lights up on the board
    return outputLetter;
  }

  /**
   * Configures the Enigma machine with the specified settings.
   *
   * @param {SettingsInterface} settings - The settings for configuring the Enigma machine.
   * @throws {Error} If the provided settings are invalid.
   */
  configure(settings: SettingsInterface): void {
    this._plugboard.configure(settings.plugboard);
    this._rotors.configure(settings.rotors);
    this._reflector.configure(settings.reflector);
  }

  /**
   * Validates and ciphers a word using the configured Enigma machine settings.
   *
   * @param {string} word - The word to be ciphered.
   * @returns {string} The ciphered word.
   * @throws {Error} If an invalid character is found in the input word.
   */
  cypher(word: string): string {
    let outputWord = "";

    // Parse word and cypher letter
    const characters = word.trim().split("");
    characters.forEach((char, index) => {
      // Allow any character from "a" to "z", case insensitive and white space
      if (!/^[a-z ]+$/i.test(char)) {
        const errorMessage = `Invalid character "${char}" found in position "${index.toString()}"`;
        this._logger.error(errorMessage);
        throw new Error(errorMessage);
      } else if (char === " ") {
        outputWord += char;
      } else {
        outputWord += this.pressLetter(char.toUpperCase());
      }
    });

    this._logger.info(`Word "${word}" cyphered into "${outputWord}"`);
    return outputWord;
  }
}

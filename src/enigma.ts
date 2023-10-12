import { Logger, LoggerInterface } from "./logger";
import { Plugboard, PlugboardInterface } from "./plugboard";
import { Reflector, ReflectorInterface } from "./reflector";
import { Rotors, RotorSettingsInterface, RotorsInterface } from "./rotors";

export interface SettingsInterface {
  plugboard: string[];
  reflector: string;
  rotors: RotorSettingsInterface[];
}

export interface EnigmaInterface {
  configure(settings: SettingsInterface): void;
  cypher(word: string): string;
}

export class Enigma implements EnigmaInterface {
  private _logger: LoggerInterface;

  private _plugboard: PlugboardInterface;

  private _reflector: ReflectorInterface;

  private _rotors: RotorsInterface;

  constructor(shouldLog: boolean = false) {
    this._logger = new Logger(shouldLog);
    this._plugboard = new Plugboard(this._logger);
    this._reflector = new Reflector(this._logger);
    this._rotors = new Rotors(this._logger);
  }

  private pressLetter(letter: string): string {
    // On the plugboard, if the socket of the letter being cyphered is connected to the socket of another letter, the letter being cyphered gets that value
    let outputLetter: string = this._plugboard.scramble(letter);

    // The rotors will move accordingly providing additional scrambling (from right to left)
    outputLetter = this._rotors.scramble(outputLetter, true);

    // The reflector returns the wired letter
    outputLetter = this._reflector.scramble(outputLetter);

    // The rotors will move accordingly providing additional scrambling (from left to right)
    outputLetter = this._rotors.scramble(outputLetter, false);

    // The plugboard scrambles the letter again if the letter socket is connected to another letter socket
    outputLetter = this._plugboard.scramble(outputLetter);

    // The output letter would light up on the board
    return outputLetter;
  }

  configure(settings: SettingsInterface): void {
    this._plugboard.configure(settings.plugboard);
    this._rotors.configure(settings.rotors);
    this._reflector.configure(settings.reflector);
  }

  cypher(word: string): string {
    let outputWord: string = "";

    // Parse word and cypher letter
    [...word.trim()].forEach((char, index) => {
      // Allow any character from "a" to "z", case insensitive and white space
      if (!/^[a-z ]+$/i.test(char)) {
        const errorMessage: string = `Invalid character "${char}" found in position "${index}"`;
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

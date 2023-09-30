import Logger from "./logger";
import Plugboard from "./plugboard";
import Reflector from "./reflector";
import Rotors from "./rotors";

interface EnigmaSettings {
  plugboard: string[];
  reflector: string;
  ringOffset: string;
  rotors: { position: string; type: string }[];
}

class Enigma {
  private logger: Logger;

  private plugboard: Plugboard;

  private reflector: Reflector;

  private rotors: Rotors;

  constructor(shouldLog: boolean = false) {
    this.logger = new Logger(shouldLog);
    this.plugboard = new Plugboard(this.logger);
    this.reflector = new Reflector(this.logger);
    this.rotors = new Rotors(this.logger);
  }

  private pressLetter(letter: string): string {
    // On the plugboard, if the socket of the letter being cyphered is connected to the socket of another letter, the letter being cyphered gets that value
    let outputLetter = this.plugboard.scramble(letter);

    // The rotors will move accordingly providing additional scrambling (from right to left)
    outputLetter = this.rotors.parse(outputLetter, true);

    // The reflector returns the wired letter
    outputLetter = this.reflector.scramble(outputLetter);

    // The rotors will move accordingly providing additional scrambling (from left to right)
    outputLetter = this.rotors.parse(outputLetter, false);

    // The plugboard scrambles the letter again if the letter socket is connected to another letter socket
    outputLetter = this.plugboard.scramble(outputLetter);

    // The output letter would light up on the board
    return outputLetter;
  }

  configure(settings: EnigmaSettings): void {
    this.plugboard.configure(settings.plugboard);
    this.rotors.configure(settings.rotors, settings.ringOffset);
    this.reflector.configure(settings.reflector);
  }

  cypher(word: string): string {
    let outputWord = "";

    // Parse word and cypher letter
    [...word.trim()].forEach((char, index) => {
      // Allow any character from "a" to "z", case insensitive and white space
      if (!/^[a-z ]+$/i.test(char)) {
        const errorMessage = `Invalid character "${char}" found in position "${index}"`;
        this.logger.error(errorMessage);
        throw new Error(errorMessage);
      } else if (char === " ") {
        outputWord += char;
      } else {
        outputWord += this.pressLetter(char.toUpperCase());
      }
    });

    this.logger.info(`Word "${word}" cyphered into "${outputWord}"`);
    return outputWord;
  }
}

export default Enigma;

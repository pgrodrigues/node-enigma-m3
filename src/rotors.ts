import type Logger from "logger";

interface EnigmaRotor {
  ring: string;
  turnover: string[];
  type: string;
}

interface MoveableRotor extends EnigmaRotor {
  offset: string;
  position: string;
  stepCount: number;
}

class Rotors {
  private readonly AVAILABLE_ROTORS: EnigmaRotor[] = [
    { ring: "EKMFLGDQVZNTOWYHXUSPAIBRCJ", turnover: ["R"], type: "I" },
    { ring: "AJDKSIRUXBLHWTMCQGZNPYFVOE", turnover: ["F"], type: "II" },
    { ring: "BDFHJLCPRTXVZNYEIWGAKMUSQO", turnover: ["W"], type: "III" },
    { ring: "ESOVPZJAYQUIRHXLNFTGKDCMWB", turnover: ["K"], type: "IV" },
    { ring: "VZBRGITYUPSDNHLXAWMJQOFECK", turnover: ["A"], type: "V" },
    { ring: "JPGVOUMFYQBENHZRDKASXLICTW", turnover: ["A", "N"], type: "VI" },
    { ring: "NZJHGRCXMYSWBOUFAIVLPEKQDT", turnover: ["A", "N"], type: "VII" },
    { ring: "FKQHTLXOCBJSPDZRAMEWNIUYGV", turnover: ["A", "N"], type: "VIII" }
  ];

  private logger: Logger;

  private rotors: MoveableRotor[] = [];

  constructor(logger: Logger) {
    this.logger = logger;
  }

  private applyOffsetToLetter(letter: string, offset: number): string {
    let index: number = this.getLetterIndex(letter);
    index += 26;
    index += offset;
    index %= 26;

    return this.getLetterFromIndex(index);
  }

  private getLetterFromIndex(index: number): string {
    return String.fromCharCode(65 + index);
  }

  private getLetterIndex(letter: string): number {
    return letter.charCodeAt(0) - 65;
  }

  private performStepping(index: number): void {
    this.rotors[index].position = this.applyOffsetToLetter(this.rotors[index].position, 1);
    this.rotors[index].stepCount += 1;

    this.logger.info(
      `[Rotor ${this.rotors[index].type}] position is now ${this.rotors[index].position}`
    );
  }

  private scramble(index: number, letter: string, rightToLeft: boolean): string {
    const rotor: MoveableRotor = this.rotors[index];

    let outputLetter: string = this.applyOffsetToLetter(
      letter,
      this.getLetterIndex(rotor.position)
    );

    const entryContactLetter: string = this.applyOffsetToLetter(
      outputLetter,
      -this.getLetterIndex(rotor.offset)
    );

    if (rightToLeft) {
      outputLetter = rotor.ring.charAt(this.getLetterIndex(entryContactLetter));
    } else {
      outputLetter = this.getLetterFromIndex(rotor.ring.indexOf(entryContactLetter));
    }

    const exitContactLetter: string = this.applyOffsetToLetter(
      outputLetter,
      this.getLetterIndex(rotor.offset)
    );

    outputLetter = this.applyOffsetToLetter(
      exitContactLetter,
      -this.getLetterIndex(rotor.position)
    );

    this.logger.info(
      `[Rotor ${rotor.type}] ${letter} => [ ${entryContactLetter} => ${exitContactLetter} ] => ${outputLetter}`
    );
    return outputLetter;
  }

  configure(
    rotorsSettings: { offset: string | number; position: string | number; type: string }[]
  ): void {
    if (!rotorsSettings) {
      const errorMessage: string = "Rotors settings are missing";
      this.logger.error(errorMessage);
      throw new Error(errorMessage);
    }

    if (!Array.isArray(rotorsSettings)) {
      const errorMessage: string = "Rotors settings must be an array";
      this.logger.error(errorMessage);
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
      const errorMessage: string =
        "Rotors settings must include the ring offset, position and type of the three rotors";
      this.logger.error(errorMessage);
      throw new Error(errorMessage);
    }

    // Define the rotors
    const rotors: MoveableRotor[] = [];
    rotorsSettings.forEach((rs) => {
      const rotor = this.AVAILABLE_ROTORS.find((availableRotor) => availableRotor.type === rs.type);
      let offset: string;
      let position: string;

      if (!rotor) {
        const errorMessage: string = `Invalid rotor type: ${rs.type}`;
        this.logger.error(errorMessage);
        throw new Error(errorMessage);
      }

      if (rotors.some((r) => r.type === rs.type)) {
        const errorMessage: string = `There can't be multiple rotors of the same type: ${rs.type}`;
        this.logger.error(errorMessage);
        throw new Error(errorMessage);
      }

      if (typeof rs.position === "string" && /^[A-Z]$/.test(rs.position)) {
        position = rs.position;
      } else if (typeof rs.position === "number" && rs.position > 0 && rs.position < 27) {
        position = this.getLetterFromIndex(rs.position - 1);
      } else {
        const errorMessage: string = "Invalid rotor position";
        this.logger.error(errorMessage);
        throw new Error(errorMessage);
      }

      if (typeof rs.offset === "string" && /^[A-Z]$/.test(rs.offset)) {
        offset = rs.offset;
      } else if (typeof rs.offset === "number" && rs.offset > 0 && rs.offset < 27) {
        offset = this.getLetterFromIndex(rs.offset - 1);
      } else {
        const errorMessage: string = "Invalid rotor ring offset";
        this.logger.error(errorMessage);
        throw new Error(errorMessage);
      }

      rotors.push({ ...rotor, offset, position, stepCount: 0 });
    });

    this.rotors = [...rotors].reverse();
  }

  parse(letter: string, rightToLeft: boolean): string {
    let outputLetter: string = letter;
    this.logger.info(
      `[${this.rotors[0].position}] [${this.rotors[1].position}] [${this.rotors[2].position}]`
    );

    // The rotors are stepped before each letter is encrypted
    if (rightToLeft) {
      let midStepped: boolean = false;

      // Always rotate the rightmost rotor
      this.performStepping(0);

      // Check for turnover of the rightmost rotor
      if (this.rotors[0].turnover.includes(this.rotors[0].position)) {
        this.logger.info(`[Rotor ${this.rotors[0].type}] turnover position`);
        this.performStepping(1);
        midStepped = true;
      }

      // Check for turnover of the middle rotor
      if (this.rotors[1].turnover.includes(this.applyOffsetToLetter(this.rotors[1].position, 1))) {
        if (this.rotors[1].stepCount % 26 === 0) {
          this.logger.info(`[Rotor ${this.rotors[1].type}] turnover position`);
          this.performStepping(1);
          this.performStepping(2);
        } else if (
          // Check for double stepping of the middle rotor
          !midStepped
        ) {
          this.performStepping(2);
          if (this.rotors[2].turnover.includes(this.rotors[2].position)) {
            this.performStepping(1);
          }
        }
      }

      outputLetter = this.scramble(0, outputLetter, rightToLeft);
      outputLetter = this.scramble(1, outputLetter, rightToLeft);
      outputLetter = this.scramble(2, outputLetter, rightToLeft);
    } else {
      // Left-to-right movement: Encrypt the letter through all rotors
      outputLetter = this.scramble(2, outputLetter, rightToLeft);
      outputLetter = this.scramble(1, outputLetter, rightToLeft);
      outputLetter = this.scramble(0, outputLetter, rightToLeft);
    }

    return outputLetter;
  }
}

export default Rotors;

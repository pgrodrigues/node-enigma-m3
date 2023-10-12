import { Enigma } from "../src/enigma";
import { Logger } from "../src/logger";
import { Plugboard } from "../src/plugboard";
import { Reflector } from "../src/reflector";
import { Rotors } from "../src/rotors";

jest.mock("../src/logger");
jest.mock("../src/plugboard");
jest.mock("../src/reflector");
jest.mock("../src/rotors");

describe("Enigma", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  afterAll(() => {
    jest.clearAllMocks();
  });

  describe("configure", () => {
    test("Should initialize the plugboard, reflector and rotors during initialization stage", () => {
      new Enigma();

      expect(Logger).toHaveBeenCalledTimes(1);
      expect(Plugboard).toHaveBeenCalledTimes(1);
      expect(Reflector).toHaveBeenCalledTimes(1);
      expect(Rotors).toHaveBeenCalledTimes(1);
    });

    test("Should configure the plugboard, reflector and rotors during configuration stage", () => {
      const plugboardSpy = jest
        .spyOn(Plugboard.prototype, "configure")
        .mockImplementation(() => "Plugboard configure method");
      const reflectorSpy = jest
        .spyOn(Reflector.prototype, "configure")
        .mockImplementation(() => "Reflector configure method");
      const rotorsSpy = jest
        .spyOn(Rotors.prototype, "configure")
        .mockImplementation(() => "Rotors configure method");
      const enigma = new Enigma();
      const settings = {
        plugboard: [],
        reflector: "B",
        rotors: [
          { offset: "A", position: "A", type: "I" },
          { offset: "A", position: "A", type: "II" },
          { offset: "A", position: "A", type: "III" }
        ]
      };

      enigma.configure(settings);

      expect(plugboardSpy).toHaveBeenCalledWith(settings.plugboard);
      expect(reflectorSpy).toHaveBeenCalledWith(settings.reflector);
      expect(rotorsSpy).toHaveBeenCalledWith(settings.rotors);
    });
  });

  describe("cypher", () => {
    test("Should throw an error when cyphering an invalid character", () => {
      const enigma = new Enigma();
      const character = "Ç";
      const settings = {
        plugboard: [],
        reflector: "B",
        rotors: [
          { offset: "A", position: "A", type: "I" },
          { offset: "A", position: "A", type: "II" },
          { offset: "A", position: "A", type: "III" }
        ]
      };

      enigma.configure(settings);

      expect(() => enigma.cypher(character)).toThrowError(
        new Error(`Invalid character "${character}" found in position "0"`)
      );
    });
  });
});

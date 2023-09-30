import Enigma from "../src/enigma";
import Logger from "../src/logger";
import Plugboard from "../src/plugboard";
import Reflector from "../src/reflector";
import Rotors from "../src/rotors";

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

  describe("Configuring", () => {
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
        ringOffset: "AAA",
        rotors: [
          { position: "A", type: "I" },
          { position: "A", type: "II" },
          { position: "A", type: "III" }
        ]
      };

      enigma.configure(settings);

      expect(plugboardSpy).toHaveBeenCalledWith(settings.plugboard);
      expect(reflectorSpy).toHaveBeenCalledWith(settings.reflector);
      expect(rotorsSpy).toHaveBeenCalledWith(settings.rotors, settings.ringOffset);
    });
  });
});

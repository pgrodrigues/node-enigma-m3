import { Logger } from "../src/logger";
import { Rotor } from "../src/rotor";

jest.mock("../src/logger");

describe("Rotor", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  afterAll(() => {
    jest.clearAllMocks();
  });

  describe("constructor and getters", () => {
    test("Should set the initial values using the constructor and getters should work correctly", () => {
      const logger = new Logger(false);
      const rotor = new Rotor("A", "A", "EKMFLGDQVZNTOWYHXUSPAIBRCJ", ["R"], "I", logger);

      expect(rotor.position).toBe("A");
      expect(rotor.stepCount).toBe(0);
      expect(rotor.turnover).toEqual(["R"]);
      expect(rotor.type).toBe("I");
    });
  });

  describe("scramble", () => {
    test("Should perform the scrambling of a letter from right to left", () => {
      const logger = new Logger(false);
      const rotor = new Rotor("A", "A", "EKMFLGDQVZNTOWYHXUSPAIBRCJ", ["R"], "I", logger);

      expect(rotor.scramble("A", true)).toBe("E");
    });

    test("Should perform the scrambling from left to right", () => {
      const logger = new Logger(false);
      const rotor = new Rotor("A", "A", "EKMFLGDQVZNTOWYHXUSPAIBRCJ", ["R"], "I", logger);

      expect(rotor.scramble("A", false)).toBe("U");
    });
  });

  describe("step", () => {
    test("Should perform the stepping of the rotor", () => {
      const logger = new Logger(false);
      const rotor = new Rotor("A", "A", "EKMFLGDQVZNTOWYHXUSPAIBRCJ", ["R"], "I", logger);

      rotor.step();

      expect(rotor.position).toBe("B");
      expect(rotor.stepCount).toBe(1);
    });
  });
});

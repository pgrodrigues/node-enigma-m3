import { Logger } from "../src/logger";
import { Rotors } from "../src/rotors";

jest.mock("../src/logger");

describe("Rotors", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  afterAll(() => {
    jest.clearAllMocks();
  });

  describe("configure", () => {
    test("Should throw an error when configuring the rotors without settings", () => {
      const logger = new Logger(false);
      const rotors = new Rotors(logger);

      // @ts-expect-error Intentional usage of a different type
      expect(() => rotors.configure(undefined)).toThrow(new Error("Rotors settings are missing"));
    });

    test("Should throw an error when configuring the rotors with a non-array value", () => {
      const logger = new Logger(false);
      const rotors = new Rotors(logger);

      // @ts-expect-error Intentional usage of a different type
      expect(() => rotors.configure("I")).toThrow(new Error("Rotors settings must be an array"));
    });

    test("Should throw an error when configuring the rotors with an array with invalid length", () => {
      const logger = new Logger(false);
      const rotors = new Rotors(logger);

      expect(() =>
        rotors.configure([
          { offset: "A", position: "A", type: "I" },
          { offset: "A", position: "A", type: "II" }
        ])
      ).toThrow(
        new Error(
          "Rotors settings must include the ring offset, position and type of the three rotors"
        )
      );
    });

    test("Should throw an error when configuring a rotor without a ring offset", () => {
      const logger = new Logger(false);
      const rotors = new Rotors(logger);

      expect(() =>
        rotors.configure([
          { offset: "A", position: "A", type: "I" },
          { offset: "A", position: "A", type: "II" },
          // @ts-expect-error Intentional usage of a different type
          { position: "A", type: "II" }
        ])
      ).toThrow(
        new Error(
          "Rotors settings must include the ring offset, position and type of the three rotors"
        )
      );
    });

    test("Should throw an error when configuring a rotor without position", () => {
      const logger = new Logger(false);
      const rotors = new Rotors(logger);

      expect(() =>
        rotors.configure([
          { offset: "A", position: "A", type: "I" },
          { offset: "A", position: "A", type: "II" },
          // @ts-expect-error Intentional usage of a different type
          { offset: "A", type: "II" }
        ])
      ).toThrow(
        new Error(
          "Rotors settings must include the ring offset, position and type of the three rotors"
        )
      );
    });

    test("Should throw an error when configuring a rotor without type", () => {
      const logger = new Logger(false);
      const rotors = new Rotors(logger);

      expect(() =>
        rotors.configure([
          { offset: "A", position: "A", type: "I" },
          { offset: "A", position: "A", type: "II" },
          // @ts-expect-error Intentional usage of a different type
          { offset: "A", position: "A" }
        ])
      ).toThrow(
        new Error(
          "Rotors settings must include the ring offset, position and type of the three rotors"
        )
      );
    });

    test("Should throw an error when configuring a rotor of an invalid type", () => {
      const logger = new Logger(false);
      const rotors = new Rotors(logger);
      const invalidType = "X";

      expect(() =>
        rotors.configure([
          { offset: "A", position: "A", type: "I" },
          { offset: "A", position: "A", type: "II" },
          { offset: "A", position: "A", type: invalidType }
        ])
      ).toThrow(new Error(`Invalid rotor type: ${invalidType}`));
    });

    test("Should throw an error when configuring a rotor of the same type of an already configured rotor", () => {
      const logger = new Logger(false);
      const rotors = new Rotors(logger);
      const existingType = "II";

      expect(() =>
        rotors.configure([
          { offset: "A", position: "A", type: "I" },
          { offset: "A", position: "A", type: existingType },
          { offset: "A", position: "A", type: existingType }
        ])
      ).toThrow(new Error(`There can't be multiple rotors of the same type: ${existingType}`));
    });

    test("Should throw an error when configuring the position of a rotor with an invalid letter", () => {
      const logger = new Logger(false);
      const rotors = new Rotors(logger);

      expect(() =>
        rotors.configure([
          { offset: "A", position: "A", type: "I" },
          { offset: "A", position: "A", type: "II" },
          { offset: "A", position: "Ç", type: "III" }
        ])
      ).toThrow(new Error("Invalid rotor position"));
    });

    test("Should throw an error when configuring the position of a rotor with an invalid letter index", () => {
      const logger = new Logger(false);
      const rotors = new Rotors(logger);

      expect(() =>
        rotors.configure([
          { offset: "A", position: 1, type: "I" },
          { offset: "A", position: 1, type: "II" },
          { offset: "A", position: 0, type: "III" }
        ])
      ).toThrow(new Error("Invalid rotor position"));
    });

    test("Should throw an error when configuring the ring offset of a rotor with an invalid letter", () => {
      const logger = new Logger(false);
      const rotors = new Rotors(logger);

      expect(() =>
        rotors.configure([
          { offset: "A", position: "A", type: "I" },
          { offset: "A", position: "A", type: "II" },
          { offset: "Ç", position: "A", type: "III" }
        ])
      ).toThrow(new Error("Invalid rotor ring offset"));
    });

    test("Should throw an error when configuring the ring offset of a rotor with an invalid letter index", () => {
      const logger = new Logger(false);
      const rotors = new Rotors(logger);

      expect(() =>
        rotors.configure([
          { offset: 1, position: "A", type: "I" },
          { offset: 1, position: "A", type: "II" },
          { offset: 0, position: "A", type: "III" }
        ])
      ).toThrow(new Error("Invalid rotor ring offset"));
    });

    test("Should not throw an error when configuring the rotors with valid types and ring offset and position as letters", () => {
      const logger = new Logger(false);
      const rotors = new Rotors(logger);

      expect(() =>
        rotors.configure([
          { offset: "A", position: "A", type: "I" },
          { offset: "A", position: "A", type: "II" },
          { offset: "A", position: "A", type: "III" }
        ])
      ).not.toThrow();
    });

    test("Should not throw an error when configuring the rotors with valid types and ring offset and position as letter indexes", () => {
      const logger = new Logger(false);
      const rotors = new Rotors(logger);

      expect(() =>
        rotors.configure([
          { offset: 1, position: 1, type: "I" },
          { offset: 1, position: 1, type: "II" },
          { offset: 1, position: 1, type: "III" }
        ])
      ).not.toThrow();
    });
  });

  describe("scramble", () => {
    test("Should throw an error when trying to scramble without setting the rotors", () => {
      const logger = new Logger(false);
      const rotors = new Rotors(logger);

      expect(() => rotors.scramble("A", true)).toThrow(new Error("Rotors not configured"));
    });

    test("Should perform the scrambling of a letter from right to left", () => {
      const logger = new Logger(false);
      const rotors = new Rotors(logger);

      rotors.configure([
        { offset: "A", position: "A", type: "I" },
        { offset: "A", position: "A", type: "II" },
        { offset: "A", position: "A", type: "III" }
      ]);

      expect(rotors.scramble("A", true)).toBe("F");
    });

    test("Should perform the scrambling of a letter from left to right", () => {
      const logger = new Logger(false);
      const rotors = new Rotors(logger);

      rotors.configure([
        { offset: "A", position: "A", type: "I" },
        { offset: "A", position: "A", type: "II" },
        { offset: "A", position: "A", type: "III" }
      ]);

      expect(rotors.scramble("A", false)).toBe("D");
    });

    test("Should cover double stepping and leftmost rotor turnover logic", () => {
      const logger = new Logger(false);
      const rotors = new Rotors(logger);

      rotors.configure([
        { offset: "A", position: "A", type: "I" },
        { offset: "A", position: "D", type: "II" },
        { offset: "A", position: "U", type: "III" }
      ]);

      rotors.scramble("A", true);
      rotors.scramble("A", true);
      expect(rotors.scramble("A", true)).toBe("J");
    });
  });
});

import Logger from "../src/logger";
import Rotors from "../src/rotors";

jest.mock("../src/logger");

describe("Rotors", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  afterAll(() => {
    jest.clearAllMocks();
  });

  describe("Configuring", () => {
    test("Should throw an error when configuring the rotors without rotors settings", () => {
      const logger = new Logger(false);
      const rotors = new Rotors(logger);

      // @ts-expect-error Intentional usage of a different type
      expect(() => rotors.configure(undefined, "AAA")).toThrowError(
        new Error("Rotors settings are missing")
      );
    });

    test("Should throw an error when configuring the rotors with invalid rotors settings", () => {
      const logger = new Logger(false);
      const rotors = new Rotors(logger);

      expect(() => rotors.configure([], "AAA")).toThrowError(new Error("Invalid rotors settings"));
    });

    test("Should throw an error when configuring the rotors without ring offset settings", () => {
      const logger = new Logger(false);
      const rotors = new Rotors(logger);

      // @ts-expect-error Intentional usage of a different type
      expect(() => rotors.configure([{ position: "A", type: "I" }], undefined)).toThrowError(
        new Error("Ring offset settings are missing")
      );
    });

    test("Should throw an error when configuring the rotors with invalid ring offset settings", () => {
      const logger = new Logger(false);
      const rotors = new Rotors(logger);

      expect(() => rotors.configure([{ position: "A", type: "I" }], "A12")).toThrowError(
        new Error("Invalid ring offset")
      );
    });

    test("Should throw an error when configuring a rotor of an invalid type", () => {
      const logger = new Logger(false);
      const rotors = new Rotors(logger);
      const invalidType = "X";

      expect(() => rotors.configure([{ position: "A", type: invalidType }], "AAA")).toThrowError(
        new Error(`Invalid rotor type: ${invalidType}`)
      );
    });

    test("Should throw an error when configuring a rotor of the same type of an already configured rotor", () => {
      const logger = new Logger(false);
      const rotors = new Rotors(logger);
      const existingType = "I";

      expect(() =>
        rotors.configure(
          [
            { position: "A", type: existingType },
            { position: "A", type: existingType }
          ],
          "AAA"
        )
      ).toThrowError(new Error(`There can't be multiple rotors of the same type: ${existingType}`));
    });

    test("Should throw an error when configuring a rotor with an invalid position", () => {
      const logger = new Logger(false);
      const rotors = new Rotors(logger);

      expect(() => rotors.configure([{ position: "Ç", type: "I" }], "AAA")).toThrowError(
        new Error("Invalid rotor position")
      );
    });

    test("Should not throw an error when configuring the rotors with valid ring offset and rotors settings", () => {
      const logger = new Logger(false);
      const rotors = new Rotors(logger);

      expect(() => rotors.configure([{ position: "A", type: "I" }], "AAA")).not.toThrowError();
    });
  });
});

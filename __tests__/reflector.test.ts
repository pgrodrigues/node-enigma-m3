import { Logger } from "../src/logger";
import { Reflector } from "../src/reflector";

jest.mock("../src/logger");

describe("Reflector", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  afterAll(() => {
    jest.clearAllMocks();
  });

  describe("Configuring", () => {
    test("Should throw an error when configuring a reflector without settings", () => {
      const logger = new Logger(false);
      const reflector = new Reflector(logger);

      // @ts-expect-error Intentional usage of a different type
      expect(() => reflector.configure(undefined)).toThrowError(
        new Error("Reflector settings are missing")
      );
    });

    test("Should throw an error when configuring a reflector of an invalid type", () => {
      const logger = new Logger(false);
      const reflector = new Reflector(logger);
      const invalidType = "invalidType";

      expect(() => reflector.configure(invalidType)).toThrowError(
        new Error(`Invalid reflector type: ${invalidType}`)
      );
    });

    test("Should not throw an error when configuring a reflector of a valid type", () => {
      const logger = new Logger(false);
      const reflector = new Reflector(logger);

      expect(() => reflector.configure("B")).not.toThrowError();
    });
  });

  describe("Scrambling", () => {
    test("Should throw an error when trying to scramble without setting a reflector", () => {
      const logger = new Logger(false);
      const reflector = new Reflector(logger);

      expect(() => reflector.scramble("A")).toThrowError(new Error("Reflector not configured"));
    });

    test("Should return the second letter of the pair for a given first letter", () => {
      const logger = new Logger(false);
      const reflector = new Reflector(logger);

      reflector.configure("B");

      expect(reflector.scramble("A")).toEqual("Y");
    });

    test("Should return the first letter of the pair for a given second letter", () => {
      const logger = new Logger(false);
      const reflector = new Reflector(logger);

      reflector.configure("B");

      expect(reflector.scramble("Y")).toEqual("A");
    });
  });
});

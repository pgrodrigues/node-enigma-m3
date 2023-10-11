import { Logger } from "../src/logger";
import { Plugboard } from "../src/plugboard";

jest.mock("../src/logger");

describe("Plugboard", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  afterAll(() => {
    jest.clearAllMocks();
  });

  describe("Configuring", () => {
    test("Should throw an error when configuring the plugboard without settings", () => {
      const logger = new Logger(false);
      const plugboard = new Plugboard(logger);

      // @ts-expect-error Intentional usage of a different type
      expect(() => plugboard.configure(undefined)).toThrowError(
        new Error("Plugboard settings are missing")
      );
    });

    test("Should throw an error when configuring the plugboard with a non-array value", () => {
      const logger = new Logger(false);
      const plugboard = new Plugboard(logger);

      // @ts-expect-error Intentional usage of a different type
      expect(() => plugboard.configure("AB")).toThrowError(
        new Error("Plugboard pairs must be an array")
      );
    });

    test("Should throw an error when configuring the plugboard with invalid pairs", () => {
      const logger = new Logger(false);
      const plugboard = new Plugboard(logger);

      expect(() => plugboard.configure(["AB", "C"])).toThrowError(
        new Error("Each plugboard pair must consist of exactly two letters")
      );
    });

    test("Should throw an error when configuring the plugboard with duplicate letters", () => {
      const logger = new Logger(false);
      const plugboard = new Plugboard(logger);

      expect(() => plugboard.configure(["AB", "AC"])).toThrowError(
        new Error("Plugboard pairs must not contain duplicate letters")
      );
    });

    test("Should not throw an error when configuring the plugboard without pairs", () => {
      const logger = new Logger(false);
      const plugboard = new Plugboard(logger);

      expect(() => plugboard.configure([])).not.toThrowError();
    });

    test("Should not throw an error when configuring the plugboard with valid pairs", () => {
      const logger = new Logger(false);
      const plugboard = new Plugboard(logger);

      expect(() => plugboard.configure(["AB", "CD"])).not.toThrowError();
    });
  });

  describe("Scrambling", () => {
    test("Should return the same letter when configured without pairs", () => {
      const logger = new Logger(false);
      const plugboard = new Plugboard(logger);

      plugboard.configure([]);

      expect(plugboard.scramble("A")).toEqual("A");
    });

    test("Should return the second letter of the pair for a given first letter", () => {
      const logger = new Logger(false);
      const plugboard = new Plugboard(logger);

      plugboard.configure(["AB", "CD"]);

      expect(plugboard.scramble("A")).toEqual("B");
    });

    test("Should return the first letter of the pair for a given second letter", () => {
      const logger = new Logger(false);
      const plugboard = new Plugboard(logger);

      plugboard.configure(["AB", "CD"]);

      expect(plugboard.scramble("B")).toEqual("A");
    });
  });
});

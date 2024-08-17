import Utils from "../src/utils";

describe("Utils", () => {
  describe("applyOffsetToLetter", () => {
    test("Should return the correct letter after applying a positive offset to a letter", () => {
      expect(Utils.applyOffsetToLetter("A", 2)).toBe("C");
      expect(Utils.applyOffsetToLetter("Z", 1)).toBe("A");
    });

    test("Should return the correct letter after applying a negative offset to a letter", () => {
      expect(Utils.applyOffsetToLetter("C", -2)).toBe("A");
      expect(Utils.applyOffsetToLetter("A", -1)).toBe("Z");
    });
  });

  describe("getLetterFromIndex", () => {
    test("Should return the letter for a given index", () => {
      expect(Utils.getLetterFromIndex(0)).toBe("A");
      expect(Utils.getLetterFromIndex(25)).toBe("Z");
    });
  });

  describe("getLetterIndex", () => {
    test("Should return the index for a given letter", () => {
      expect(Utils.getLetterIndex("A")).toBe(0);
      expect(Utils.getLetterIndex("Z")).toBe(25);
    });
  });
});

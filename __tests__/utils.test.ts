import { Utils } from "../src/utils";

describe("Utils", () => {
  test("applyOffsetToLetter should return the correct letter after applying an offset", () => {
    expect(Utils.applyOffsetToLetter("A", 2)).toBe("C");
    expect(Utils.applyOffsetToLetter("C", -1)).toBe("B");
    expect(Utils.applyOffsetToLetter("Z", 1)).toBe("A");
  });

  test("getLetterFromIndex should return the correct letter from an index", () => {
    expect(Utils.getLetterFromIndex(0)).toBe("A");
    expect(Utils.getLetterFromIndex(25)).toBe("Z");
  });

  test("getLetterIndex should return the correct index for a letter", () => {
    expect(Utils.getLetterIndex("A")).toBe(0);
    expect(Utils.getLetterIndex("Z")).toBe(25);
  });
});

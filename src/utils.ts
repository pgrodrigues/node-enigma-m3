/**
 * Applies an offset to a given letter to produce a new letter.
 *
 * @param {string} letter - The input letter to be offset.
 * @param {number} offset - The offset to be applied.
 * @returns {string} The new letter after applying the offset.
 */
export function applyOffsetToLetter(letter: string, offset: number): string {
  let index = getLetterIndex(letter);
  index += 26;
  index += offset;
  index %= 26;

  return getLetterFromIndex(index);
}

/**
 * Converts an index (0-25) to the corresponding letter (A-Z).
 *
 * @param {number} index - The index to be converted to a letter.
 * @returns {string} The letter corresponding to the index.
 */
export function getLetterFromIndex(index: number): string {
  return String.fromCharCode(65 + index);
}

/**
 * Converts a letter (A-Z) to its corresponding index (0-25).
 *
 * @param {string} letter - The letter to be converted to an index.
 * @returns {number} The index corresponding to the letter.
 */
export function getLetterIndex(letter: string): number {
  return letter.charCodeAt(0) - 65;
}

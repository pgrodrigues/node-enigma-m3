export class Utils {
  static applyOffsetToLetter(letter: string, offset: number): string {
    let index: number = this.getLetterIndex(letter);
    index += 26;
    index += offset;
    index %= 26;

    return this.getLetterFromIndex(index);
  }

  static getLetterFromIndex(index: number): string {
    return String.fromCharCode(65 + index);
  }

  static getLetterIndex(letter: string): number {
    return letter.charCodeAt(0) - 65;
  }
}

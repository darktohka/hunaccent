import { accentMap, accentMapUpper, window } from "accentmap";
import trees from "trees";

export default class Accentizer {
  static accentize(input: string): string {
    const expectedNewlines = Accentizer.countNewlines(input);
    const buffer = "_".repeat(window - 1);
    input = `${buffer} ${input}\n ${buffer}`;

    const fullWidth = window * 2 + 1;
    let slideWindow = "";
    let output = "";

    for (let i = 0; i < fullWidth; i++) {
      slideWindow += this.normalize(input[i]);
    }

    let inputPos = window;

    for (let i = fullWidth; i < input.length; ++i) {
      const middleChar = slideWindow[window];

      if (accentMap.hasOwnProperty(middleChar)) {
        const label = trees[middleChar].classify(slideWindow);

        if (input[inputPos] === input[inputPos].toUpperCase()) {
          output += accentMapUpper[middleChar][label];
        } else {
          output += accentMap[middleChar][label];
        }
      } else {
        output += input[inputPos];
      }

      inputPos++;

      slideWindow = slideWindow.substring(1);
      slideWindow += Accentizer.normalize(input[i]);
    }

    // Count how many newlines the new string has
    const actualNewlines = Accentizer.countNewlines(output);

    if (expectedNewlines < actualNewlines) {
      // Remove trailing newlines
      output = output.slice(0, -(actualNewlines - expectedNewlines));
    } else if (expectedNewlines > actualNewlines) {
      // Add trailing newlines
      output += "\n".repeat(expectedNewlines - actualNewlines);
    }

    return output;
  }

  // Count newlines in a text
  static countNewlines(text: string): number {
    const newlineMatch = text.match(/\n*$/);
    return newlineMatch ? newlineMatch[0].length : 0;
  }

  // Map characters to a small set of characters
  static normalize(c: string): string {
    // Whitespaces
    if (/^\s*$/.test(c)) {
      return " ";
    }
    // Digits
    if (/^\d*$/.test(c)) {
      return "0";
    }
    // Punctuation
    if (/^[.,\/#!$%\^&\*;:{}=\-_`~()]*$/.test(c)) {
      return "_";
    }
    // Alpha characters
    if (/^[a-zA-Z]*$/.test(c)) {
      return c.toLowerCase();
    }
    // Other characters
    return "*";
  }
}

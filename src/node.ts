import { window } from "accentmap";

export default class Node {
  leaf: boolean;
  c: string;
  position: number;
  left: number;
  right: number;
  label: number;

  constructor(c: string, position: number, left: number, right?: number) {
    this.c = c;
    this.position = position;

    if (right === undefined) {
      this.left = -1;
      this.right = -1;
      this.label = left;
      this.leaf = true;
    } else {
      this.left = left;
      this.right = right;
      this.label = -1;
      this.leaf = false;
    }
  }

  getLabel(): number {
    return this.label;
  }

  getLeaf(): boolean {
    return this.leaf;
  }

  getPosition(): number {
    return this.position;
  }

  // All questions are in the form of "Is the nth charcter in
  // the sliding window c?"
  // if so, go right, else go left
  getNextDecision(slideWindow: string): number {
    return slideWindow[window + this.position] === this.c
      ? this.right
      : this.left;
  }
}

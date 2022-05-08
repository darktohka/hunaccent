import Node from "./node";

export default class DecisionTree {
  tree: Node[];

  constructor(tree: Node[]) {
    this.tree = tree;
  }

  classify(slideWindow: string): number {
    let index = 0;
    let limit = 200;

    while (index < this.tree.length) {
      const node = this.tree[index];
      index = node.getNextDecision(slideWindow);

      if (node.getLeaf()) {
        // Leaf node is reached, no further decisions necessary
        return node.getLabel();
      }

      if (limit-- < 1) {
        break;
      }
    }

    return 0;
  }
}

import { TreeNode } from '@/types/ITree';
interface Config<T> {
  keyField: keyof TreeNode<T>;
  childrenField: keyof TreeNode<T>;
}

export default class TreeNodeUtils<T> {
  private keyField:  keyof TreeNode<T>;
  private childrenField: keyof TreeNode<T>

  constructor(config: Config<T> = {
    childrenField : 'children',
    keyField : 'key'
  }) {
    this.keyField = config.keyField;
    this.childrenField = config.childrenField;
  }

  hasChildren(nodeData: TreeNode<T>): boolean {
    const children = nodeData && nodeData[this.childrenField];
    return Array.isArray(children) && children.length > 0;
  }

  isBranch(nodeData: TreeNode<T>): boolean {
    const children = nodeData && nodeData[this.childrenField];
    return Array.isArray(children) && children.length >= 0;
  }

  getNodeByKey(nodes: TreeNode<T>[], key: any): TreeNode<T> | null {
    let found: TreeNode<T> | null = null;
    const self = this;

    for (const node of nodes) {
      if (node[self.keyField] === key) {
        found = node;
      } else if (self.hasChildren(node)) {
        found = self.getNodeByKey(node[self.childrenField] as TreeNode<T>[], key);
      }

      if (found) {
        break;
      }
    }

    return found;
  }

  findNodes(nodes: TreeNode<T>[], predicate: (node: TreeNode<T>, parents: TreeNode<T>[]) => boolean, parents: TreeNode<T>[] = []): TreeNode<T>[] {
    let found: TreeNode<T>[] = [];
    const self = this;

    for (const node of nodes) {
      if (predicate(node, parents)) {
        found = [...found, node];
      }

      if (self.hasChildren(node)) {
        const foundChildren = self.findNodes(node[self.childrenField] as TreeNode<T>[], predicate, [...parents, node]);
        found = [...found, ...foundChildren];
      }
    }

    return found;
  }

  filterNode(node: TreeNode<T>, predicate: (node: TreeNode<T>, parents: TreeNode<T>[]) => boolean, parents: TreeNode<T>[] = []):  TreeNode<T> | null {
    let res: TreeNode<T> | null = null;
    const self = this;
    const children = node && node[self.childrenField];
    const filteredChildren = self.isBranch(node) && Array.isArray(children) ? children.map((childNode: TreeNode<T>) =>
      self.filterNode(childNode, predicate, [...parents, node])).filter((i: TreeNode<T> | null) => i !== null) : null;

    const hasChildrenMatched = filteredChildren && filteredChildren.length > 0;
    const isNodeItselfMatched = predicate(node, parents);

    if (isNodeItselfMatched || hasChildrenMatched) {
      const childrenData = filteredChildren ? { [self.childrenField]: filteredChildren } : {};
      res = Object.assign({}, node, childrenData);
    }

    return res;
  }

  filterNodes(nodes: TreeNode<T>[], predicate: (node: TreeNode<T>, parents: TreeNode<T>[]) => boolean, parents: TreeNode<T>[] = []): TreeNode<T>[] {
    return nodes.map(node => this.filterNode(node, predicate, parents)).filter((i: TreeNode<T> | null) => i !== null);
  }

  sortNode(node: TreeNode<T>, compareFunction: (a: TreeNode<T>, b: TreeNode<T>, parents: TreeNode<T>[]) => number, parents: TreeNode<T>[] = []): TreeNode<T> {
    const self = this;
    if (self.hasChildren(node)) {
      const children = [...node[self.childrenField] as Array<any>]
        .sort((...args: [TreeNode<T>, TreeNode<T>]) => compareFunction(...args, [...parents, node]))
        .map(childNode => self.sortNode(
          childNode,
          compareFunction,
          [...parents, node, childNode]
        ));
      return { ...node, [self.childrenField]: children };
    }

    return node;
  }

  sortNodes(nodes: TreeNode<T>[], compareFunction: (a: TreeNode<T>, b: TreeNode<T>, parents: TreeNode<T>[]) => number, parents: TreeNode<T>[] = []): TreeNode<T>[] {
    return nodes.sort((...args: [TreeNode<T>, TreeNode<T>]) => compareFunction(...args, parents)).map(
      node => this.sortNode(node, compareFunction, parents));
  }

  mapNode(node: TreeNode<T>, mapFunction: (node: TreeNode<T>, parents: TreeNode<T>[]) => TreeNode<T>, parents: TreeNode<T>[] = []): TreeNode<T> {
    const self = this;

    const mappedNode = mapFunction({ ...node }, parents);

    if (self.hasChildren(node) && Array.isArray(node[self.childrenField])) {
      const children = ((node[self.childrenField]) as Array<TreeNode<T>>).map((n: TreeNode<T>) => self.mapNode(n, mapFunction, [...parents, mappedNode]));

      (mappedNode[self.childrenField] as TreeNode<T>[] )  = children
    }

    return mappedNode;
  }

  mapNodes(nodes: TreeNode<T>[], mapFunction: (node: TreeNode<T>, parents: TreeNode<T>[]) => TreeNode<T>, parents: TreeNode<T>[] = []): TreeNode<T>[] {
    return nodes.map(node => this.mapNode(node, mapFunction, parents));
  }

}

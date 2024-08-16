import { TreeNode } from "@/types/ITree";


/**
 * Recursively traverses a tree and applies a callback function to each node.
 * @param tree The root node of the tree.
 * @param callback The callback function to be applied to each node.
 * @param childField The property name of the child nodes in the tree node object. Defaults to "children".
 * @typeparam T The type of data stored in the tree nodes.
 * @author TanPn16
 */
const recursiveTree = <T>(
  tree: TreeNode<T>,
  callback: (node: TreeNode<T>) => void,
  childField: keyof TreeNode<T> = "children"
) => {
  callback(tree);
  if (tree[childField] && Array.isArray(tree[childField])) {
    tree[childField].forEach((child: TreeNode<T>) => {
      recursiveTree(child, callback, childField);
    });
  }
};


/**
 * Generates a hashmap from a tree with the specified key.
 * @param tree The root node of the tree.
 * @param key The key to use for the hashmap.
 * @typeparam T The type of data stored in the tree nodes.
 * @returns The hashmap generated from the tree.
 * @author TanPn16
 */
export const genHashMapTree = <T>(tree : TreeNode<T> , key : keyof TreeNode<T>) => {
  let hashMap : any;

  recursiveTree(tree, (treeNode) => {
      hashMap[treeNode[key]] = treeNode;
  });

  return hashMap;
};



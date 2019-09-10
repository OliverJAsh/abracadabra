import { NodePath } from "@babel/traverse";
import * as t from "@babel/types";

import { last } from "../array-helpers";

export {
  getPreviousSibling,
  hasSiblingStatement,
  getPreviousSiblingStatements,
  getNextSiblingStatements
};

function getPreviousSibling(path: NodePath): NodePath | undefined {
  return last(path.getAllPrevSiblings());
}

function hasSiblingStatement(path: NodePath): boolean {
  const allSiblingStatements = [
    ...getPreviousSiblingStatements(path),
    ...getNextSiblingStatements(path)
  ];

  return allSiblingStatements.length > 0;
}

function getPreviousSiblingStatements(path: NodePath): t.Statement[] {
  return path
    .getAllPrevSiblings()
    .map(({ node }) => node)
    .filter(isStatement);
}

function getNextSiblingStatements(path: NodePath): t.Statement[] {
  return path
    .getAllNextSiblings()
    .map(({ node }) => node)
    .filter(isStatement);
}

function isStatement(node: t.Node): node is t.Statement {
  return t.isStatement(node);
}

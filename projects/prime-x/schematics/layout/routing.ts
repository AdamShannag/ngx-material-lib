import { Change, InsertChange } from '@schematics/angular/utility/change';
import * as ts from 'typescript';
import { Tree, SchematicsException, Rule } from '@angular-devkit/schematics';

export interface AddPathObjectToRoutesArrayContext {
  path: string;
  component: string;
}

export function addObjectToArrayChange(
  context: AddPathObjectToRoutesArrayContext,
  tree: Tree,
  path: string
): Change {
  let text = tree.read(path);
  if (!text) throw new SchematicsException(`File does not exist.`);
  let sourceText = text.toString('utf-8');

  let sourceFile = ts.createSourceFile(
    path,
    sourceText,
    ts.ScriptTarget.Latest,
    true
  );

  let nodes: ts.Node[] = getSourceNodes(sourceFile);

  const routesNode = nodes.find(
    (n) => n.kind === ts.SyntaxKind.Identifier && n.getText() === 'routes'
  );

  if (!routesNode || !routesNode.parent) {
    throw new SchematicsException(`expected routes variable in ${path}`);
  }

  let routesNodeSiblings = routesNode.parent.getChildren();
  let routesNodeIndex = routesNodeSiblings.indexOf(routesNode);
  routesNodeSiblings = routesNodeSiblings.slice(routesNodeIndex);

  let routeArrayLiteralExpressionNode = routesNodeSiblings.find(
    (n) => n.kind === ts.SyntaxKind.ArrayLiteralExpression
  );

  if (!routeArrayLiteralExpressionNode) {
    throw new SchematicsException(
      `routes ArrayLiteralExpression node is not defined`
    );
  }

  let routesListNode = routeArrayLiteralExpressionNode
    .getChildren()
    .find((n) => n.kind === ts.SyntaxKind.SyntaxList);

  if (!routesListNode) {
    throw new SchematicsException(`routes list node is not defined`);
  }

  let routeToAdd = `
   {
     path: ${context.path},
     component: ${context.component}
   },
   `;

  return new InsertChange(path, routesListNode.getStart(), routeToAdd);
}

export function getSourceNodes(sourceFile: ts.SourceFile): ts.Node[] {
  const nodes: ts.Node[] = [sourceFile];
  const result = [];

  while (nodes.length > 0) {
    const node = nodes.shift();

    if (node) {
      result.push(node);
      if (node.getChildCount(sourceFile) >= 0) {
        nodes.unshift(...node.getChildren());
      }
    }
  }

  return result;
}

export function addObjectToRoutesArrayRule(
  options: AddPathObjectToRoutesArrayContext,
  path: string
): Rule {
  return (tree: Tree) => {
    let context = options;
    let change = addObjectToArrayChange(context, tree, path);

    const declarationRecorder = tree.beginUpdate(path);
    if (change instanceof InsertChange) {
      declarationRecorder.insertLeft(change.pos, change.toAdd);
    }
    tree.commitUpdate(declarationRecorder);

    return tree;
  };
}

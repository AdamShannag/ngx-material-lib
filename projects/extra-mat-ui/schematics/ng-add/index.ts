import { Rule, Tree, SchematicContext } from '@angular-devkit/schematics';
import { importModules } from '../util';
import { modules } from './modules';

export function ngAdd(): Rule {
  return (tree: Tree, context: SchematicContext) => {
    importModules(tree, context, '/src/app/app.module.ts', modules);

    return tree;
  };
}

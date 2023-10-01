import {
  Rule,
  apply,
  url,
  move,
  chain,
  mergeWith,
  MergeStrategy,
  applyTemplates,
  Tree,
  SchematicContext,
} from '@angular-devkit/schematics';
import { importModules, path } from '../util';
import { modules } from './modules';
import { NodePackageInstallTask } from '@angular-devkit/schematics/tasks';

export function ngAdd(): Rule {
  return (tree: Tree, context: SchematicContext) => {
    importModules(tree, context, '/src/app/app.module.ts', modules);
    context.addTask(
      new NodePackageInstallTask({
        packageManager: 'npm',
        packageName: 'primeng',
      })
    );

    const assetsSource = apply(url('./files/assets'), [
      applyTemplates({}),
      move(path('src/assets', '')),
    ]);

    return chain([mergeWith(assetsSource, MergeStrategy.Overwrite)]);
  };
}

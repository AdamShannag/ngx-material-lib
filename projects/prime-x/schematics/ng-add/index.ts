import { Rule, Tree, SchematicContext } from '@angular-devkit/schematics';
import { importModules } from '../util';
import { modules } from './modules';
import { NodePackageInstallTask } from '@angular-devkit/schematics/tasks';
import {
  NodeDependency,
  NodeDependencyType,
  addPackageJsonDependency,
} from '@schematics/angular/utility/dependencies';

export function ngAdd(): Rule {
  return (tree: Tree, context: SchematicContext) => {
    importModules(tree, context, '/src/app/app.module.ts', modules);

    const deps: NodeDependency[] = [
      {
        type: NodeDependencyType.Default,
        name: 'primeng',
        version: '16.4.1',
        overwrite: true,
      },
      {
        type: NodeDependencyType.Default,
        name: 'primeflex',
        version: '3.3.1',
        overwrite: true,
      },
      {
        type: NodeDependencyType.Default,
        name: 'primeicons',
        version: '6.0.1',
        overwrite: true,
      },
    ];

    deps.forEach((dep) => addPackageJsonDependency(tree, dep));

    context.addTask(new NodePackageInstallTask(), []);

    return tree;
  };
}

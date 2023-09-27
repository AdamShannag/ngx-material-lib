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
import { NodePackageInstallTask } from '@angular-devkit/schematics/tasks';
import { importModules, moduleFilePath, path } from '../util';
import { addKecloakProvider } from './provider';
import { modules } from './modules';

export function keycloakGenerator(): Rule {
  return (tree: Tree, context: SchematicContext) => {
    context.addTask(
      new NodePackageInstallTask({
        packageManager: 'npm',
        packageName: 'keycloak-angular',
      })
    );
    context.addTask(
      new NodePackageInstallTask({
        packageManager: 'npm',
        packageName: 'keycloak-js',
      })
    );

    importModules(tree, context, moduleFilePath('src/app'), modules);
    addKecloakProvider(tree, context, moduleFilePath('src/app'));

    const keycloakSource = apply(url('./files/keycloak'), [
      applyTemplates({}),
      move(path('src/app', 'keycloak')),
    ]);

    const assetsSource = apply(url('./files/assets'), [
      applyTemplates({}),
      move(path('src/assets', '')),
    ]);

    return chain([
      mergeWith(keycloakSource, MergeStrategy.Overwrite),
      mergeWith(assetsSource, MergeStrategy.Overwrite),
    ]);
  };
}

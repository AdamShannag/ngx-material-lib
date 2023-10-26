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
} from '@angular-devkit/schematics';
import {
  addDeclarationsToModule,
  importFiles,
  moduleFilePath,
  path,
} from '../util';
import { ErrorComponentSchema } from './error-component-schema';
import { addErrorRouteToRoutesArrayRule } from './routing';
import { SchematicContext } from '@angular-devkit/schematics';

export function errorComponentGenerator(options: ErrorComponentSchema): Rule {
  return (tree: Tree, context: SchematicContext) => {
    const routingModule = 'src/app/app-routing.module.ts';
    const pathToComponent = options.path.replace('src/app/', '');
    const files = [
      {
        classifiedName: 'ErrorComponent',
        importPath: `./${pathToComponent}/error/error.component`,
      },
    ];

    importFiles(tree, routingModule, files);
    addDeclarationsToModule(tree, context, moduleFilePath('src/app'), files);

    const errorSources = apply(url('./files/error'), [
      applyTemplates({}),
      move(path(options.path, 'error')),
    ]);

    const assetsSource = apply(url('./files/assets'), [
      applyTemplates({}),
      move(path('src/assets', '')),
    ]);

    return chain([
      mergeWith(errorSources, MergeStrategy.Overwrite),
      mergeWith(assetsSource, MergeStrategy.Overwrite),
      addErrorRouteToRoutesArrayRule(routingModule),
    ]);
  };
}

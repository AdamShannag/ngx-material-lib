import {
  Rule,
  apply,
  url,
  applyTemplates,
  move,
  chain,
  mergeWith,
  externalSchematic,
  MergeStrategy,
} from '@angular-devkit/schematics';
import { strings } from '@angular-devkit/core';
import { TableComponentSchema } from './table-component';
import { importModules, moduleFilePath, path } from '../util';
import { Tree, SchematicContext } from '@angular-devkit/schematics';
import { modules } from './modules';

export function tableComponentGenerator(options: TableComponentSchema): Rule {
  return (tree: Tree, context: SchematicContext) => {
    importModules(tree, context, moduleFilePath(options.path), modules);

    const templateSource = apply(url('./files'), [
      applyTemplates({
        classify: strings.classify,
        dasherize: strings.dasherize,
        name: options.name,
      }),
      move(path(options.path, options.name)),
    ]);

    return chain([
      externalSchematic('@schematics/angular', 'component', options),
      mergeWith(templateSource, MergeStrategy.Overwrite),
    ]);
  };
}

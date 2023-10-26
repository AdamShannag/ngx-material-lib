import {
  Rule,
  apply,
  url,
  move,
  chain,
  mergeWith,
  MergeStrategy,
  applyTemplates,
} from '@angular-devkit/schematics';
import { path } from '../util';
import { CrudPageComponentSchema } from './crud-page-component';
import { strings } from '@angular-devkit/core';

export function crudPageGenerator(options: CrudPageComponentSchema): Rule {
  return () => {
    const crudSource = apply(url('./files/crud'), [
      applyTemplates({
        classify: strings.classify,
        dasherize: strings.dasherize,
        name: options.name,
      }),
      move(path(options.path, options.name)),
    ]);

    return chain([mergeWith(crudSource, MergeStrategy.Overwrite)]);
  };
}

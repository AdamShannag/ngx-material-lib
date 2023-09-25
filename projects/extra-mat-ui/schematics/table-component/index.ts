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
import { strings, normalize } from '@angular-devkit/core';
import { TableComponentSchema } from './table-component';

export function tableComponentGenerator(options: TableComponentSchema): Rule {
  return () => {
    const templateSource = apply(url('./files'), [
      applyTemplates({
        classify: strings.classify,
        dasherize: strings.dasherize,
        name: options.name,
      }),
      move(normalize(`/${options.path}/${strings.dasherize(options.name)}`)),
    ]);

    return chain([
      externalSchematic('@schematics/angular', 'component', options),
      mergeWith(templateSource, MergeStrategy.Overwrite),
    ]);
  };
}

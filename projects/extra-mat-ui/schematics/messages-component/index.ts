import {
  Rule,
  apply,
  url,
  applyTemplates,
  move,
  chain,
  mergeWith,
  MergeStrategy,
} from '@angular-devkit/schematics';
import { strings } from '@angular-devkit/core';
import { MessagesComponentSchema } from './messages-component';
import {
  addDeclarationsToModule,
  importModules,
  moduleFilePath,
  path,
} from '../util';
import { SchematicContext, Tree } from '@angular-devkit/schematics';
import { modules } from './modules';
import { Module } from '../module';

export function messagesComponentGenerator(
  options: MessagesComponentSchema
): Rule {
  return (tree: Tree, context: SchematicContext) => {
    const mfp = moduleFilePath(options.path);
    const dashedName = strings.dasherize(options.name);

    const declarations: Module[] = [
      {
        classifiedName: `${strings.classify(options.name)}Component`,
        importPath: `./${dashedName}/${dashedName}.component`,
      },
    ];

    addDeclarationsToModule(tree, context, mfp, declarations);
    importModules(tree, context, mfp, modules);

    const templateSource = apply(url('./files'), [
      applyTemplates({
        classify: strings.classify,
        dasherize: strings.dasherize,
        name: options.name,
      }),
      move(path(options.path, options.name)),
    ]);

    return chain([mergeWith(templateSource, MergeStrategy.Overwrite)]);
  };
}

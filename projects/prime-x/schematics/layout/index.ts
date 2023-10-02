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
import { importFiles, importModules, moduleFilePath, path } from '../util';
import { modules } from './modules';
import { updateIndex } from './update.index';
import {
  AddPathObjectToRoutesArrayContext as RouteContext,
  addObjectToRoutesArrayRule as addNewRouteToRoutesArrayRule,
} from './routing';
import { files } from './files';

export function layoutGenerator(): Rule {
  return (tree: Tree, context: SchematicContext) => {
    const routingModule = 'src/app/app-routing.module.ts';
    importModules(tree, context, moduleFilePath('src/app'), modules);
    importFiles(tree, routingModule, files);
    updateIndex(tree);

    const layoutSources = apply(url('./files/layout'), [
      applyTemplates({}),
      move(path('src/app', 'layout')),
    ]);

    const assetsSource = apply(url('./files/assets'), [
      applyTemplates({}),
      move(path('src/assets', '')),
    ]);

    const srcSource = apply(url('./files/src'), [
      applyTemplates({}),
      move(path('src', '')),
    ]);

    const appSource = apply(url('./files/app'), [
      applyTemplates({}),
      move(path('src/app', '')),
    ]);

    const options: RouteContext = {
      path: "''",
      component: 'LayoutComponent',
    };

    return chain([
      mergeWith(layoutSources, MergeStrategy.Overwrite),
      mergeWith(assetsSource, MergeStrategy.Overwrite),
      mergeWith(srcSource, MergeStrategy.Overwrite),
      mergeWith(appSource, MergeStrategy.Overwrite),
      addNewRouteToRoutesArrayRule(options, routingModule),
    ]);
  };
}

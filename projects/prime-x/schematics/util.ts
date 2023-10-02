import {
  Tree,
  SchematicsException,
  SchematicContext,
} from '@angular-devkit/schematics';
import {
  applyToUpdateRecorder,
  Change,
} from '@schematics/angular/utility/change';
import {
  addImportToModule,
  addDeclarationToModule,
} from '@schematics/angular/utility/ast-utils';
import { strings, normalize, split } from '@angular-devkit/core';
import * as ts from 'typescript';
import { Module } from './module';
import { insertImport } from '@schematics/angular/utility/ast-utils';

export const path = (path: string, name: string): string => {
  return normalize(`/${path}/${strings.dasherize(name)}`);
};

export const moduleFilePath = (path: string): string => {
  return `${path}/${split(normalize(path)).pop()}.module.ts`;
};

export const importModules = (
  tree: Tree,
  context: SchematicContext,
  moduleFilePath: string,
  modules: Module[]
) => {
  context.logger.info('Adding library Modules to the app...');

  if (!tree.exists(moduleFilePath)) {
    throw new SchematicsException(
      `The file ${moduleFilePath} doesn't exists...`
    );
  }

  const recorder = tree.beginUpdate(moduleFilePath);

  const text = tree.read(moduleFilePath);

  if (text === null) {
    throw new SchematicsException(
      `The file ${moduleFilePath} doesn't exists...`
    );
  }

  const source = ts.createSourceFile(
    moduleFilePath,
    text.toString(),
    ts.ScriptTarget.Latest,
    true
  );

  modules.forEach((m) =>
    applyToUpdateRecorder(
      recorder,
      addImportToModule(source, moduleFilePath, m.classifiedName, m.importPath)
    )
  );

  tree.commitUpdate(recorder);
};

export const addDeclarationsToModule = (
  tree: Tree,
  context: SchematicContext,
  moduleFilePath: string,
  modules: Module[]
) => {
  context.logger.info('Adding Declarations To Module...');

  if (!tree.exists(moduleFilePath)) {
    throw new SchematicsException(
      `The file ${moduleFilePath} doesn't exists...`
    );
  }

  const recorder = tree.beginUpdate(moduleFilePath);

  const text = tree.read(moduleFilePath);

  if (text === null) {
    throw new SchematicsException(
      `The file ${moduleFilePath} doesn't exists...`
    );
  }

  const source = ts.createSourceFile(
    moduleFilePath,
    text.toString(),
    ts.ScriptTarget.Latest,
    true
  );

  modules.forEach((m) =>
    applyToUpdateRecorder(
      recorder,
      addDeclarationToModule(
        source,
        moduleFilePath,
        m.classifiedName,
        m.importPath
      )
    )
  );

  tree.commitUpdate(recorder);
};

export const importFiles = (
  tree: Tree,
  filePath: string,
  modules: Module[]
) => {
  if (!tree.exists(filePath)) {
    throw new SchematicsException(`The file ${filePath} doesn't exists...`);
  }

  const recorder = tree.beginUpdate(filePath);

  const text = tree.read(filePath);

  if (text === null) {
    throw new SchematicsException(`The file ${filePath} doesn't exists...`);
  }

  const source = ts.createSourceFile(
    filePath,
    text.toString(),
    ts.ScriptTarget.Latest,
    true
  );

  const changes: Change[] = [];

  modules.forEach((m) =>
    changes.push(insertImport(source, filePath, m.classifiedName, m.importPath))
  );

  applyToUpdateRecorder(recorder, changes);

  tree.commitUpdate(recorder);
};

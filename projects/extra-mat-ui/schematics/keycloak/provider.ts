import {
  Tree,
  SchematicsException,
  SchematicContext,
} from '@angular-devkit/schematics';
import { applyToUpdateRecorder } from '@schematics/angular/utility/change';
import {
  addProviderToModule,
  insertImport,
} from '@schematics/angular/utility/ast-utils';
import * as ts from 'typescript';

export const addKecloakProvider = (
  tree: Tree,
  context: SchematicContext,
  moduleFilePath: string
) => {
  context.logger.info('Adding keycloak provider to the app...');

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

  const changes = [
    ...addProviderToModule(
      source,
      moduleFilePath,
      'initializeKeycloak',
      './keycloak/keycloak-factory'
    ),
    insertImport(source, moduleFilePath, 'KeycloakService', 'keycloak-angular'),
    insertImport(source, moduleFilePath, 'APP_INITIALIZER', '@angular/core'),
  ];

  applyToUpdateRecorder(recorder, changes);

  tree.commitUpdate(recorder);

  let updatedText = tree
    .read(moduleFilePath)
    ?.toString()
    .replace('initializeKeycloak', `__init`)
    .replace(
      'initializeKeycloak',
      `{
      provide: APP_INITIALIZER,
      useFactory: initializeKeycloak,
      multi: true,
      deps: [KeycloakService],
    },`
    )
    .replace('__init', `initializeKeycloak`);

  tree.overwrite(moduleFilePath, updatedText!);
};

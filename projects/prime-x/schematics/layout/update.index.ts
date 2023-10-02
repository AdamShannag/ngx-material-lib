import { Tree, SchematicsException } from '@angular-devkit/schematics';

export const updateIndex = (tree: Tree) => {
  const indexFilePath = 'src/index.html';

  if (!tree.exists('src/index.html')) {
    throw new SchematicsException(
      `The file ${indexFilePath} doesn't exists...`
    );
  }

  let updatedText = tree
    .read(indexFilePath)
    ?.toString()
    .replace(
      '</head>',
      `  <link id="theme-css" rel="stylesheet" type="text/css" href="assets/layout/styles/theme/lara-light-indigo/theme.css">
</head>`
    );

  tree.overwrite(indexFilePath, updatedText!);
};

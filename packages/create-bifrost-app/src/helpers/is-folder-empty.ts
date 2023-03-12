import fs from 'fs';
import path from 'path';
import pico from 'picocolors';

export const isFolderEmpty = (root: string, name: string): boolean => {
  const validFiles = [
    '.DS_Store',
    '.git',
    '.gitattributes',
    '.gitignore',
    '.gitlab-ci.yml',
    '.hg',
    '.hgcheck',
    '.hgignore',
    '.idea',
    '.npmignore',
    '.travis.yml',
    'LICENSE',
    'Thumbs.db',
    'docs',
    'mkdocs.yml',
    'npm-debug.log',
    'pnpm-debug.log',
    'pnpm-error.log',
  ];

  const conflicts = fs
    .readdirSync(root)
    .filter(file => !validFiles.includes(file))
    // Support IntelliJ IDEA-based editors
    .filter(file => !file.endsWith('.iml'));

  if (conflicts.length > 0) {
    console.log(
      `The directory ${pico.green(name)} contains files that could conflict:`,
    );
    console.log();
    conflicts.map(file => {
      try {
        const stats = fs.lstatSync(path.join(root, file));
        if (stats.isDirectory()) {
          console.log(`  ${pico.blue(file)}/`);
        } else {
          console.log(`  ${file}`);
        }
      } catch {
        console.log(`  ${file}`);
      }
    });
    console.log();
    console.log(
      'Either try using a new directory name, or remove the files listed above.',
    );
    console.log();

    return false;
  }

  return true;
};

#!/usr/bin/env node
import chalk from 'chalk';
import { Command } from 'commander';
import path from 'path';
// eslint-disable-next-line import/no-named-as-default
import prompts from 'prompts';
import checkForUpdate from 'update-check';

import { createApp, DownloadError } from 'create-app';
import { getPkgManager, validateNpmName } from 'helpers';

import packageJson from '../package.json';

let projectPath: string | undefined = '';

const program = new Command(packageJson.name)
  .arguments('[project-directory]')
  .usage(`${chalk.green('[project-directory]')} [options]`)
  .action((name: string | undefined) => {
    projectPath = name;
  })
  .allowUnknownOption()
  .parse(process.argv);

// eslint-disable-next-line complexity
const run = async (): Promise<void> => {
  if (typeof projectPath === 'string') {
    projectPath = projectPath.trim();
  }

  if (projectPath === undefined || projectPath === '') {
    const res = await prompts({
      type: 'text',
      name: 'path',
      message: 'What is your project named?',
      initial: 'my-app',
      validate: (name: string) => {
        const validation = validateNpmName(path.basename(path.resolve(name)));
        if (validation.valid) {
          return true;
        }

        return 'Invalid project name: ' + validation.problems[0];
      },
    });

    if (typeof res.path === 'string') {
      projectPath = res.path.trim();
    }
  }

  if (projectPath === undefined || projectPath === '') {
    console.log();
    console.log('Please specify the project directory:');
    console.log(
      `  ${chalk.cyan(program.name())} ${chalk.green('<project-directory>')}`,
    );
    console.log();
    console.log('For example:');
    console.log(
      `  ${chalk.cyan(program.name())} ${chalk.green('my-bifrost-app')}`,
    );
    console.log();
    console.log(
      `Run ${chalk.cyan(`${program.name()} --help`)} to see all options.`,
    );
    process.exit(1);
  }

  const resolvedProjectPath = path.resolve(projectPath);
  const projectName = path.basename(resolvedProjectPath);

  const { valid, problems } = validateNpmName(projectName);
  if (!valid) {
    console.error(
      `Could not create a project called ${chalk.red(
        `"${projectName}"`,
      )} because of npm naming restrictions:`,
    );

    problems.forEach(p => console.error(`    ${chalk.red.bold('*')} ${p}`));
    process.exit(1);
  }

  const packageManager = getPkgManager();
  if (packageManager !== 'pnpm') {
    console.error('Please use pnpm as package manager with Bifrost.');
    process.exit(1);
  }

  const packageVersion = packageJson.version;
  try {
    await createApp({
      appPath: resolvedProjectPath,
      packageVersion,
    });
  } catch (reason) {
    if (!(reason instanceof DownloadError)) {
      throw reason;
    }

    const res = await prompts({
      type: 'confirm',
      name: 'builtin',
      message:
        `Could not download Bifrost template because of a connectivity issue between your machine and GitHub.\n` +
        `Do you want to use the default template instead?`,
      initial: true,
    });
    if (res.builtin === undefined || res.builtin === null) {
      throw reason;
    }

    await createApp({
      appPath: resolvedProjectPath,
      packageVersion,
    });
  }
};

const update = checkForUpdate(packageJson).catch(() => null);

const notifyUpdate = async (): Promise<void> => {
  try {
    const res = await update;
    if (res?.latest === undefined) {
      const pkgManager = getPkgManager();

      console.log();
      console.log(
        chalk.yellow.bold(
          'A new version of `create-bifrost-app` is available!',
        ),
      );
      console.log(
        'You can update by running: ' +
          chalk.cyan(
            pkgManager === 'pnpm'
              ? 'pnpm global add create-bifrost-app'
              : `${pkgManager} install --global create-bifrost-app`,
          ),
      );
      console.log();
    }
    process.exit();
  } catch {
    // ignore error
  }
};

run()
  .then(notifyUpdate)
  .catch(async reason => {
    console.log();
    console.log('Aborting installation.');
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    if (reason.command as boolean) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      console.log(`  ${chalk.cyan(reason.command as string)} has failed.`);
    } else {
      console.log(chalk.red('Unexpected error. Please report it as a bug:'));
      console.log(reason);
    }
    console.log();

    await notifyUpdate();

    process.exit(1);
  });

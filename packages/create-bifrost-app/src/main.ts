#!/usr/bin/env node
import * as p from '@clack/prompts';
import { createApp } from 'create-app';
import { getPkgManager, logCreateApp, validateNpmName } from 'helpers';
import path from 'path';
// eslint-disable-next-line import/no-named-as-default
import pico from 'picocolors';

import packageJson from '../package.json';

export const interractiveMain = (): void => {
  const run = async (): Promise<void> => {
    const res = await p.group({
      projectName: () =>
        p.text({
          message: 'What is your project named?',
          initialValue: 'my-app',
          validate: (name: string) => {
            const validation = validateNpmName(
              path.basename(path.resolve(name.trim())),
            );
            if (validation.valid) {
              return;
            }

            return 'Invalid project name:\n ' + validation.problems.join('\n ');
          },
        }),
    });

    main(res.projectName);
  };

  run().catch(reason => {
    console.log();
    console.log('Aborting installation.');
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    if (reason.command as boolean) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      console.log(`  ${pico.cyan(reason.command as string)} has failed.`);
    } else {
      console.log(pico.red('Unexpected error. Please report it as a bug:'));
      console.log(reason);
    }
    console.log();

    process.exit(1);
  });
};

export const main = (projectName: string): void => {
  const asyncWrapper = async () => {
    const resolvedProjectPath = path.resolve(projectName.trim());
    const baseProjectName = path.basename(resolvedProjectPath);

    const { valid, problems } = validateNpmName(baseProjectName);
    if (!valid) {
      console.error(
        `Could not create a project called ${pico.red(
          `"${baseProjectName}"`,
        )} because of npm naming restrictions:`,
      );

      problems.forEach(problem =>
        console.error(`    ${pico.red(pico.bold('*'))} ${problem}`),
      );
      process.exit(1);
    }

    const packageManager = getPkgManager();
    if (packageManager !== 'pnpm') {
      console.error('Please use pnpm as package manager with Bifrost.');
      process.exit(1);
    }

    const packageVersion = packageJson.version;
    await createApp({
      appPath: resolvedProjectPath,
      packageVersion,
    });
    await logCreateApp(baseProjectName);
  };

  asyncWrapper().catch(reason => {
    console.log();
    console.log('Aborting installation.');
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    if (reason.command as boolean) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      console.log(`  ${pico.cyan(reason.command as string)} has failed.`);
    } else {
      console.log(pico.red('Unexpected error. Please report it as a bug:'));
      console.log(reason);
    }
    console.log();

    process.exit(1);
  });
};

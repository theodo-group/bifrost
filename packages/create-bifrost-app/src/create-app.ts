import retry from 'async-retry';
import chalk from 'chalk';
import { execSync } from 'child_process';
import path from 'path';

import {
  downloadAndExtractRepo,
  getRepoUrl,
  hasRepo,
  install,
  isFolderEmpty,
  isWriteable,
  makeDir,
  renameProject,
  RepoInfo,
  tryGitInit,
} from './helpers';

export class DownloadError extends Error {}

export const createApp = async ({
  appPath,
}: {
  appPath: string;
  packageVersion: string;
}): Promise<void> => {
  const repoInfo: RepoInfo = {
    username: 'theodo-group',
    name: 'bifrost',
    branch: `main`,
    filePath: 'examples/bifrost-starter',
  };

  const found = await hasRepo(repoInfo);
  const example = getRepoUrl(repoInfo);

  if (!found) {
    console.error(
      `Could not locate the repository for ${chalk.red(
        `"${example}"`,
      )}. Please check that the repository exists and try again.`,
    );
    process.exit(1);
  }

  const root = path.resolve(appPath);

  if (!(await isWriteable(path.dirname(root)))) {
    console.error(
      'The application path is not writable, please check folder permissions and try again.',
    );
    console.error(
      'It is likely you do not have write permissions for this folder.',
    );
    process.exit(1);
  }

  const appName = path.basename(root);

  await makeDir(root);
  if (!isFolderEmpty(root, appName)) {
    process.exit(1);
  }

  console.log(`Creating a new Bifrost app in ${chalk.green(root)}.`);
  console.log();

  const originalDirectory = process.cwd();

  process.chdir(root);
  /**
   * If an example repository is provided, clone it.
   */
  try {
    console.log(
      `Downloading files from repo ${chalk.cyan(
        example,
      )}. This might take a moment.`,
    );
    console.log();
    await retry(() => downloadAndExtractRepo(root, repoInfo), {
      retries: 3,
    });

    renameProject(appName, root);
  } catch (reason) {
    const isErrorLike = (err: unknown): err is { message: string } => {
      return (
        typeof err === 'object' &&
        err !== null &&
        typeof (err as { message?: unknown }).message === 'string'
      );
    };
    throw new DownloadError(
      isErrorLike(reason) ? reason.message : (reason as string),
    );
  }

  console.log('Initializing a git repository...');
  if (tryGitInit(root)) {
    console.log();
  }

  console.log('Installing packages. This might take a couple of minutes.');
  console.log();

  await install(root);

  console.log();
  console.log();
  console.log('Linting your project...');
  console.log();
  execSync(`pnpm lint-fix-all`, { stdio: 'ignore', cwd: root });

  console.log();

  console.log(`${chalk.green('Success!')} Created ${appName} at ${appPath}`);
  console.log();
  console.log();
  console.log('Inside that directory, you can run several commands:');

  const cdpath =
    path.join(originalDirectory, appName) === appPath ? appName : appPath;

  console.log(chalk.cyan('  cd'), cdpath);
  console.log(`  ${chalk.cyan(`pnpm dev`)}`);
  console.log('    Starts the development servers for backend and frontend.');
};

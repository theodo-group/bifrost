import { execSync } from 'child_process';

export type PackageManager = 'npm' | 'pnpm' | 'yarn';

export const getPkgManager = (): PackageManager => {
  try {
    const userAgent = process.env.npm_config_user_agent;
    if (userAgent !== undefined) {
      if (userAgent.startsWith('yarn')) {
        return 'yarn';
      } else if (userAgent.startsWith('pnpm')) {
        return 'pnpm';
      }
    }
    try {
      execSync('pnpm --version', { stdio: 'ignore' });

      return 'pnpm';
    } catch {
      execSync('yarn --version', { stdio: 'ignore' });

      return 'yarn';
    }
  } catch {
    return 'npm';
  }
};
